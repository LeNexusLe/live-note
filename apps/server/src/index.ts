import { Hono } from 'hono';
import { requestId } from 'hono/request-id';

import type { Variables } from './client';
import { errorHandler } from './middleware/error';
import { loggerHandler } from './middleware/logger';
import { authRoutes } from './modules/v1/auth/routes';

export const app = new Hono<{ Variables: Variables }>();

app.use(requestId());
app.use(loggerHandler());
app.onError(errorHandler());

app.get('/health', async c => {
  return c.json('ok', 200);
});
app.basePath('/api/v1').route('/auth', authRoutes);

export default {
  port: 5000,
  fetch: app.fetch,
};
