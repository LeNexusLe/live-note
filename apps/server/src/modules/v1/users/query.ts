import { eq } from 'drizzle-orm';

import { db } from '@/db/adapter';
import { usersTable } from '@/db/schemas/users';

export const usersQuery = {
  getUser: async (userId: string) => {
    return await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));
  },
};
