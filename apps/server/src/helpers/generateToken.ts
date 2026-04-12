import { sign } from 'hono/jwt';

import { env } from '@/env';

export const generateToken = async (userId: string) => {
  const now = Math.floor(Date.now() / 1000);

  return await sign(
    {
      sub: userId,
      iat: now,
      exp: now + 1 * 60 * 60,
    },
    env.JWT_SECRET,
  );
};
