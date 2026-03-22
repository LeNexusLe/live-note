import { z } from 'zod';

export const loginSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});
