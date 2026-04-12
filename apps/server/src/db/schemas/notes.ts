import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

import { usersTable } from './users';

export const notesTable = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content').notNull().default(''),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
