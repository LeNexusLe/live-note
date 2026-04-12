import { DrizzleQueryError, eq } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';
import postgres from 'postgres';

import { db } from '@/db/adapter';
import { usersTable } from '@/db/schemas/users';

import { authQuery } from './query';
import type { LoginPayload, RegisterPayload } from './types';

export const authService = {
  registerUser: async (payload: RegisterPayload) => {
    try {
      const passwordHash = await Bun.password.hash(payload.password);

      await authQuery.insertUser({ ...payload, passwordHash });
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

  loginUser: async (payload: LoginPayload) => {
    try {
      const [user] = await db.select().from(usersTable).where(eq(usersTable.email, payload.email));

      if (!user) {
        throw new HTTPException(401, { message: 'Invalid credentials' });
      }

      const isPasswordValid = await Bun.password.verify(payload.password, user.passwordHash);
      if (!isPasswordValid) {
        throw new HTTPException(401, { message: 'Invalid credentials' });
      }

      return { id: user.id };
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      }

      throw new HTTPException(500, { message: 'Failed to log in user', cause: error });
    }
  },
};
