import { Hono } from 'hono';

import { errorHandler } from './middleware/error';

export const app = new Hono();

app.get('/health', async c => {
  return c.json('ok', 200);
});

app.onError(errorHandler);

export default {
  port: 5000,
  fetch: app.fetch,
};
