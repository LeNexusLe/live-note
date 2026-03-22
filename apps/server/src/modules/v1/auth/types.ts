import type z from 'zod';

import type { registerUserSchema } from './schema';

export type RegisterPayload = z.infer<typeof registerUserSchema>;
