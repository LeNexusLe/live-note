import { afterAll, beforeAll, describe, expect, it, spyOn } from 'bun:test';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { authRoutes } from './routes';
import { authService } from './service';

const payload = {
  name: 'Test User',
  email: 'test@email.com',
  password: 'password123',
};

describe('Auth routes', () => {
  const app = new Hono();

  beforeAll(() => {
    app.route('/', authRoutes);
    spyOn(authService, 'registerUser').mockResolvedValue(undefined as any);
  });

  afterAll(() => {
    spyOn(authService, 'registerUser').mockRestore();
  });

  describe('POST /register', () => {
    it('should register a user successfully', async () => {
      const res = await app.request('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(res.status).toBe(201);
    });

    it('should return 422 if email is invalid', async () => {
      const res = await app.request('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, email: 'invalid-email' }),
      });

      expect(res.status).toBe(422);
      expect(res.json()).resolves.toMatchObject({
        message: 'Validation error',
        errors: [
          {
            field: 'email',
          },
        ],
      });
    });

    it('should return 422 if password is too short', async () => {
      const res = await app.request('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, password: 'short' }),
      });

      expect(res.status).toBe(422);
      expect(res.json()).resolves.toMatchObject({
        message: 'Validation error',
        errors: [
          {
            field: 'password',
          },
        ],
      });
    });

    it('should return 422 if name is missing', async () => {
      const res = await app.request('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, name: undefined }),
      });

      expect(res.status).toBe(422);
      expect(res.json()).resolves.toMatchObject({
        message: 'Validation error',
        errors: [
          {
            field: 'name',
          },
        ],
      });
    });

    it('should return 409 if user already exists', async () => {
      const errorMessage = 'User already exists';
      spyOn(authService, 'registerUser').mockRejectedValueOnce(
        new HTTPException(409, { message: errorMessage }),
      );

      const res = await app.request('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(res.status).toBe(409);
    });

    it('should return 500 if service throws an unexpected error', async () => {
      spyOn(authService, 'registerUser').mockRejectedValueOnce(
        new HTTPException(500, { message: 'Failed to register an user' }),
      );

      const res = await app.request('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(res.status).toBe(500);
    });
  });
});
