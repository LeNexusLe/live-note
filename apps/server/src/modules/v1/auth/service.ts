import { DrizzleQueryError } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';
import postgres from 'postgres';

import { db } from '../../../db/adapter';
import { usersTable } from '../../../db/schemas/users';

import type { RegisterPayload } from './types';

export const authService = {
  registerUser: async (payload: RegisterPayload) => {
    try {
      const passwordHash = await Bun.password.hash(payload.password);

      await db.insert(usersTable).values({
        name: payload.name,
        passwordHash,
        email: payload.email,
      });
    } catch (error) {
      if (
        error instanceof DrizzleQueryError &&
        error.cause instanceof postgres.PostgresError &&
        error.cause.code === '23505'
      ) {
        throw new HTTPException(409, { message: 'User already exists' });
      }

      throw new HTTPException(500, { message: 'Failed to register an user', cause: error });
    }
  },
};
