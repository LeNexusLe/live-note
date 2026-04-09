import type { MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';

import { env } from '../env';
import type { Variables } from '../types';

export const authHandler = (): MiddlewareHandler<{ Variables: Variables }> => {
  return async (context, next) => {
    const authHeader = context.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HTTPException(401, { message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new HTTPException(401, { message: 'Unauthorized' });
    }

    try {
      const payload = await verify(token, env.JWT_SECRET, { alg: 'HS256' });
      context.set('userId', payload.sub as string);
    } catch (error) {
      throw new HTTPException(401, { message: 'Unauthorized', cause: error });
    }

    await next();
  };
};
