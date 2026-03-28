import { hc } from 'hono/client';
import type pino from 'pino';

import type { app } from './index';

export type AppType = typeof app;
export type Client = ReturnType<typeof hc<AppType>>;

export type Variables = {
  log: pino.Logger;
};

export const hcWithType = (...args: Parameters<typeof hc>): Client => hc<AppType>(...args);
