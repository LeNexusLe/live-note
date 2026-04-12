import type z from 'zod';

import type { createNoteSchema } from './schema';

export type CreateNotesPayload = z.infer<typeof createNoteSchema>;
