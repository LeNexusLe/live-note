import { Hono } from 'hono';
import type { SuccessResponse } from 'shared';

import { validateRequest } from '@/helpers/validateRequest';
import { authHandler } from '@/middleware/auth';
import type { ProtectedVariables } from '@/types';

import { createNoteSchema } from './schema';
import { notesService } from './service';

const notesRoutes = new Hono<{ Variables: ProtectedVariables }>();

notesRoutes.use(authHandler());
notesRoutes.post('/', validateRequest('json', createNoteSchema), async context => {
  const userId = context.get('userId');
  const payload = context.req.valid('json');

  await notesService.createNote({ title: payload.title, userId });

  return context.json<SuccessResponse>({
    message: 'Successfully created a note',
  });
});

export { notesRoutes };
