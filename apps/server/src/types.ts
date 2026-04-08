import type pino from 'pino';

import type { db } from './db/adapter';

export type Db = typeof db;

export type Variables = {
  log: pino.Logger;
  user: Record<string, unknown>;
};

export type ServiceContext = {
  db: Db;
  log?: pino.Logger;
};
