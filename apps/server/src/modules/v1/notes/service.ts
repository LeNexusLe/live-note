import { HTTPException } from 'hono/http-exception';

import { notesQuery } from './query';
import type { CreateNotesPayload } from './types';

export const notesService = {
  createNote: async ({ title, userId }: CreateNotesPayload & { userId: string }) => {
    try {
      await notesQuery.createNote({ title, userId });
    } catch (error) {
      throw new HTTPException(500, { message: 'Failed to create a note', cause: error });
    }
  },
};
