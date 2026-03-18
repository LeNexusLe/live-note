import { Hono } from 'hono';

import { healthService } from './services';

export const healthRoutes = new Hono();

healthRoutes.get('/', async c => {
  const health = await healthService.getHealth();
  return c.json(health, 200);
});
