import { Hono } from 'hono';

export const app = new Hono();

app.get('/health', async c => {
  return c.json('ok', 200);
});

export default app;
