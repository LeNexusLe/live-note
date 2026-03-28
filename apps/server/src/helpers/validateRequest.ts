import { zValidator } from '@hono/zod-validator';
import type { ValidationTargets } from 'hono';
import type { ZodType } from 'zod';

export const validateRequest = <T extends ZodType, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T,
) =>
  zValidator(target, schema, (result, context) => {
    if (!result.success) {
      return context.json(
        {
          message: 'Validation error',
          errors: result.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
        },
        422,
      );
    }
  });
