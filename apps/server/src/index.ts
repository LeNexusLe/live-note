import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { ErrorResponse } from 'shared';

export const app = new Hono();

app.get('/health', async c => {
  return c.json('ok', 200);
});

app.onError((error, context) => {
  if (error instanceof HTTPException) {
    return error.res ?? context.json<ErrorResponse>({ error: error.message }, error.status);
  }

  return context.json<ErrorResponse>(
    {
      error:
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : (error.stack ?? error.message),
    },
    500,
  );
});

export default {
  port: 5000,
  fetch: app.fetch,
};
