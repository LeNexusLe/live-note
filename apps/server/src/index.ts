import { Hono } from 'hono';

export const app = new Hono();

app.get('/health', async c => {
  return c.json('ok', 200);
});

export default {
  port: 5000,
  fetch: app.fetch,
};
