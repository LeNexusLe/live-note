import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';

import { generateToken } from '../../../helpers/generateToken';

import { loginUserSchema, registerUserSchema } from './schema';
import { authService } from './service';

const authRoutes = new Hono();

authRoutes.post('/register', zValidator('json', registerUserSchema), async context => {
  const payload = context.req.valid('json');

  await authService.registerUser(payload);

  return context.json({ message: 'Registration successful' });
});

authRoutes.post('/login', zValidator('json', loginUserSchema), async context => {
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
