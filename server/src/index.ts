import { Hono } from 'hono';

import { healthRoutes } from './features/health/routes';

export const app = new Hono();

app.route('/health', healthRoutes);

export default app;
