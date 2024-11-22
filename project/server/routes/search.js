import express from 'express';
import { 
  searchActivities, 
  getRecommendations 
} from '../services/elasticsearch.js';

const router = express.Router();

// Search activities
router.post('/search', async (req, res) => {
  try {
    const { query, filters, location, page, limit } = req.body;
    const results = await searchActivities({
      query,
      filters,
      location,
      page,
      limit
    });
    res.json(results);
  } catch (error) {
    console.error('Search failed:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get recommendations
router.get('/activities/:id/recommendations', async (req, res) => {
  try {
    const recommendations = await getRecommendations(req.params.id);
    res.json({ recommendations });
  } catch (error) {
    console.error('Failed to get recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

export default router;