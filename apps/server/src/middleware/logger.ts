import type { MiddlewareHandler } from 'hono';
import pino from 'pino';

import { env } from '../env';

const log = pino({
  enabled: true,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {},
  transport: env.NODE_ENV === 'production' ? undefined : { target: 'pino-pretty' },
});

export const loggerHandler = (): MiddlewareHandler => {
  return async (context, next) => {
    const startTime = Date.now();
    const requestId = context.get('requestId');

    context.set('log', log.child({ requestId }));

    await next();

    log.info(
      {
        method: context.req.method,
        url: context.req.path,
        status: context.res.status,
        duration: Date.now() - startTime,
        requestId,
      },
      'Request processed',
    );
  };
};
