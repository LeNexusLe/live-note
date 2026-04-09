import { type ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { ErrorResponse } from 'shared';

import { env } from '@/env';
import type { Variables } from '@/types';

export const errorHandler = (): ErrorHandler<{ Variables: Variables }> => {
  return async (error, context) => {
    if (error instanceof HTTPException) {
      const status = error.status;
      const logMethod = status >= 500 ? 'error' : 'warn';

      context.var.log[logMethod]({ err: error }, error.message);

      return error.res ?? context.json<ErrorResponse>({ message: error.message }, status);
    }

    context.var.log.error({ err: error }, 'Unhandled error occurred');

    return context.json<ErrorResponse>(
      {
        message:
          env.NODE_ENV === 'production' ? 'Internal Server Error' : (error.stack ?? error.message),
      },
      500,
    );
  };
};
