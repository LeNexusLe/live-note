import { Hono } from 'hono';

import { errorHandler } from './middleware/error';
import { authRoutes } from './modules/v1/auth/routes';

export const app = new Hono();

app.get('/health', async c => {
  return c.json('ok', 200);
});

app.basePath('/api/v1').route('/auth', authRoutes);

app.onError(errorHandler);

export default {
  port: 5000,
  fetch: app.fetch,
};
