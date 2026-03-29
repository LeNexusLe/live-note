import { db } from '../../../db/adapter';
import { usersTable } from '../../../db/schemas/users';

import type { RegisterPayload } from './types';

export const authQuery = {
  insertUser: async (payload: Omit<RegisterPayload, 'password'> & { passwordHash: string }) => {
    return await db.insert(usersTable).values({
      name: payload.name,
      passwordHash: payload.passwordHash,
      email: payload.email,
    });
  },
};
