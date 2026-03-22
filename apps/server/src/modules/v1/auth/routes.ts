import { Hono } from 'hono';

const authRoutes = new Hono();

authRoutes.post('/login', async context => {
  return context.json({ message: 'Login successful' });
});

export { authRoutes };
