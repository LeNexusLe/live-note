import z from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(2).max(255),
});
