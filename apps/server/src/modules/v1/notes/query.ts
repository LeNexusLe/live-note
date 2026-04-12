import { db } from '@/db/adapter';
import { notesTable } from '@/db/schemas/notes';

import type { CreateNotesPayload } from './types';

export const notesQuery = {
  createNote: async ({ title, userId }: CreateNotesPayload & { userId: string }) => {
    return db.insert(notesTable).values({
      title,
      ownerId: userId,
    });
  },
};
