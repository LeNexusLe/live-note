import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { registerUserSchema } from './schema';
import { authService } from './service';

const authRoutes = new Hono();

authRoutes.post('/register', zValidator('json', registerUserSchema), async context => {
  const payload = context.req.valid('json');

  await authService.registerUser(payload);

  return context.json({ message: 'Registration successful' });
});

export { authRoutes };
