import type pino from 'pino';

import type { db } from './db/adapter';

export type Db = typeof db;

export type Variables = {
  log: pino.Logger;
};

export type ServiceContext = {
  db: Db;
  log?: pino.Logger;
};
