import { type ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { ErrorResponse } from 'shared';

import { env } from '../env';

export const errorHandler: ErrorHandler = (error, context) => {
  if (error instanceof HTTPException) {
    return error.res ?? context.json<ErrorResponse>({ error: error.message }, error.status);
  }

  return context.json<ErrorResponse>(
    {
      error:
        env.NODE_ENV === 'production' ? 'Internal Server Error' : (error.stack ?? error.message),
    },
    500,
  );
};
