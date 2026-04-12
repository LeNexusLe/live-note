import { Hono } from 'hono';

import { authHandler } from '@/middleware/auth';
import type { ProtectedVariables } from '@/types';

import { usersService } from './service';

const usersRoutes = new Hono<{ Variables: ProtectedVariables }>();

usersRoutes.use(authHandler());
usersRoutes.get('/me', async context => {
  const userId = context.get('userId');

  const user = await usersService.getMe(userId);

  return context.json(user, 200);
});

export { usersRoutes };
