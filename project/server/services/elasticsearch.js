import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
});

// Activity mapping for better search
const ACTIVITY_MAPPING = {
  properties: {
    title: { type: 'text', analyzer: 'english' },
    description: { type: 'text', analyzer: 'english' },
    category: { type: 'keyword' },
    price: { type: 'float' },
    duration: { type: 'float' },
    rating: { type: 'float' },
    location: {
      type: 'geo_point'
    },
    provider: { type: 'keyword' },
    tags: { type: 'keyword' }
  }
};

export async function initializeElasticsearch() {
  try {
    // Create index with mapping
    const indexExists = await client.indices.exists({ index: 'activities' });
    
    if (!indexExists) {
      await client.indices.create({
        index: 'activities',
        body: {
          mappings: ACTIVITY_MAPPING
        }
      });
    }
  } catch (error) {
    console.error('Failed to initialize Elasticsearch:', error);
    throw error;
  }
}

export async function searchActivities({
  query,
  filters = {},
  location,
  page = 1,
  limit = 12
}) {
  const must = [];
  const filter = [];

  // Full text search
  if (query) {
    must.push({
      multi_match: {
        query,
        fields: ['title^2', 'description', 'tags'],
        fuzziness: 'AUTO'
      }
    });
  }

  // Category filter
  if (filters.category) {
    filter.push({ term: { category: filters.category } });
  }

  // Price range filter
  if (filters.priceRange?.min || filters.priceRange?.max) {
    const range = { price: {} };
    if (filters.priceRange.min) range.price.gte = filters.priceRange.min;
    if (filters.priceRange.max) range.price.lte = filters.priceRange.max;
    filter.push({ range });
  }

  // Duration filter
  if (filters.duration) {
    const [min, max] = filters.duration.split('-');
    const range = { duration: {} };
    if (min) range.duration.gte = parseFloat(min);
    if (max && max !== '+') range.duration.lte = parseFloat(max);
    filter.push({ range });
  }

  // Rating filter
  if (filters.rating) {
    filter.push({ range: { rating: { gte: filters.rating } } });
  }

  // Location-based filter
  if (location && filters.distance) {
    filter.push({
      geo_distance: {
        distance: `${filters.distance}km`,
        location: {
          lat: location.lat,
          lon: location.lng
        }
      }
    });
  }

  try {
    const { body } = await client.search({
      index: 'activities',
      body: {
        from: (page - 1) * limit,
        size: limit,
        query: {
          bool: {
            must,
            filter
          }
        },
        sort: [
          { _score: 'desc' },
          { rating: 'desc' }
        ]
      }
    });

    return {
      activities: body.hits.hits.map(hit => ({
        ...hit._source,
        id: hit._id,
        score: hit._score
      })),
      total: body.hits.total.value,
      page,
      totalPages: Math.ceil(body.hits.total.value / limit)
    };
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
}

export async function getRecommendations(activityId) {
  try {
    // Get the activity
    const { body: activity } = await client.get({
      index: 'activities',
      id: activityId
    });

    // Find similar activities based on category and location
    const { body } = await client.search({
      index: 'activities',
      body: {
        query: {
          bool: {
            must: [
              { term: { category: activity._source.category } }
            ],
            should: [
              {
                geo_distance: {
                  distance: '10km',
                  location: activity._source.location
                }
              }
            ],
            must_not: [
              { ids: { values: [activityId] } }
            ]
          }
        },
        size: 3
      }
    });

    return body.hits.hits.map(hit => ({
      ...hit._source,
      id: hit._id
    }));
  } catch (error) {
    console.error('Failed to get recommendations:', error);
    throw error;
  }
}

export async function indexActivity(activity) {
  try {
    await client.index({
      index: 'activities',
      id: activity.id,
      body: {
        title: activity.title,
        description: activity.description,
        category: activity.category,
        price: activity.price,
        duration: activity.duration,
        rating: activity.rating,
        location: {
          lat: activity.location.coordinates.lat,
          lon: activity.location.coordinates.lng
        },
        provider: activity.providerId,
        tags: activity.tags || []
      }
    });
  } catch (error) {
    console.error('Failed to index activity:', error);
    throw error;
  }
}

export async function updateActivityIndex(activityId, updates) {
  try {
    await client.update({
      index: 'activities',
      id: activityId,
      body: {
        doc: updates
      }
    });
  } catch (error) {
    console.error('Failed to update activity index:', error);
    throw error;
  }
}

export async function removeActivityIndex(activityId) {
  try {
    await client.delete({
      index: 'activities',
      id: activityId
    });
  } catch (error) {
    console.error('Failed to remove activity from index:', error);
    throw error;
  }
}