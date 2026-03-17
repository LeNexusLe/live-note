import { Hono } from 'hono';

import { healthRoutes } from './features/health/routes';

export const app = new Hono();

export default app;

app.route('/health', healthRoutes);
