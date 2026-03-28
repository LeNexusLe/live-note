import { type ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { ErrorResponse } from 'shared';

import type { Variables } from '../client';
import { env } from '../env';

export const errorHandler: ErrorHandler<{ Variables: Variables }> = (error, context) => {
  if (error instanceof HTTPException) {
    const status = error.status;
    const logMethod = status >= 500 ? 'error' : 'warn';

    context.var.log[logMethod]({ err: error }, error.message);

    return error.res ?? context.json<ErrorResponse>({ error: error.message }, status);
  }

  context.var.log.error({ err: error }, 'Unhandled error occurred');

  return context.json<ErrorResponse>(
    {
      error:
        env.NODE_ENV === 'production' ? 'Internal Server Error' : (error.stack ?? error.message),
    },
    500,
  );
};
