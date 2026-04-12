import type pino from 'pino';

import type { db } from './db/adapter';

export type Db = typeof db;

export type Variables = {
  log: pino.Logger;
};

export type ProtectedVariables = {
  log: pino.Logger;
  userId: string;
};

export type ServiceContext = {
  db: Db;
  log?: pino.Logger;
};
