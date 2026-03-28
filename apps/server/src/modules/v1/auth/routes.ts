import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';

import type { Variables } from '../../../client';
import { generateToken } from '../../../helpers/generateToken';
import { validateRequest } from '../../../helpers/validateRequest';

import { loginUserSchema, registerUserSchema } from './schema';
import { authService } from './service';

const authRoutes = new Hono<{ Variables: Variables }>();

authRoutes.post('/register', validateRequest('json', registerUserSchema), async context => {
  const payload = context.req.valid('json');

  await authService.registerUser(payload);

  return context.json({ message: 'Registration successful' }, 201);
});

authRoutes.post('/login', validateRequest('json', loginUserSchema), async context => {
  const payload = context.req.valid('json');

  const user = await authService.loginUser(payload);

  const token = await generateToken(user.id);

  setCookie(context, 'token', token, {
    secure: true,
    httpOnly: true,
    sameSite: 'Strict',
  });

  return context.json({ message: 'Login successful' });
});

export { authRoutes };
