import { HTTPException } from 'hono/http-exception';

import { usersQuery } from './query';

export const usersService = {
  getMe: async (userId: string) => {
    const [user] = await usersQuery.getUser(userId);

    if (!user) {
      throw new HTTPException(404, { message: 'User not found' });
    }

    return user;
  },
};
