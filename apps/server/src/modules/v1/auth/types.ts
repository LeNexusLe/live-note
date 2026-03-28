import type z from 'zod';

import type { registerUserSchema, loginUserSchema } from './schema';

export type RegisterPayload = z.infer<typeof registerUserSchema>;
export type LoginPayload = z.infer<typeof loginUserSchema>;
