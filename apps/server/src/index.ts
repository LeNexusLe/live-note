import { Hono } from 'hono';
import { requestId } from 'hono/request-id';

import { errorHandler } from './middleware/error';
import { loggerHandler } from './middleware/logger';
import { authRoutes } from './modules/v1/auth/routes';
import { notesRoutes } from './modules/v1/notes/route';
import { usersRoutes } from './modules/v1/users/routes';
import type { Variables } from './types';

export const app = new Hono<{ Variables: Variables }>();

app.use(requestId());
app.use(loggerHandler());
app.onError(errorHandler());

app.get('/health', c => c.json('ok', 200));
app
  .basePath('/api/v1')
  .route('/auth', authRoutes)
  .route('/users', usersRoutes)
  .route('/notes', notesRoutes);

export default {
  port: 5000,
  fetch: app.fetch,
};
