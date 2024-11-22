import { rest } from 'msw';

export const handlers = [
  rest.get('/api/activities', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        activities: [
          {
            id: 1,
            title: 'Desert Safari Adventure',
            description: 'Experience the thrill of dune bashing',
            price: 99,
            rating: 4.8,
            reviewCount: 128
          }
        ]
      })
    );
  }),

  rest.get('/api/bookings', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        bookings: [
          {
            id: 1,
            activityId: 1,
            date: '2023-12-15',
            status: 'confirmed',
            amount: 99
          }
        ]
      })
    );
  }),

  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;
    if (email && password) {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'mock-jwt-token',
          user: {
            id: 1,
            email,
            name: 'Test User'
          }
        })
      );
    }
    return res(ctx.status(400), ctx.json({ message: 'Invalid credentials' }));
  })
];