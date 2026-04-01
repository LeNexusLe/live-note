import { afterAll, describe, expect, it, spyOn } from 'bun:test';

import { DrizzleQueryError } from 'drizzle-orm';
import postgres from 'postgres';

import { authQuery } from './query';
import { authService } from './service';

const payload = {
  name: 'Test User',
  email: 'test@email.com',
  password: 'password123',
};

describe('Auth service', () => {
  afterAll(() => {
    spyOn(authQuery, 'insertUser').mockRestore();
  });

  describe('registeruser', () => {
    it('should register a user successfully', async () => {
      spyOn(authQuery, 'insertUser').mockResolvedValueOnce(undefined as any);

      expect(authService.registerUser(payload)).resolves.toBeUndefined();
    });

    it('should throw 500 if there is an unknown error', async () => {
      spyOn(authQuery, 'insertUser').mockRejectedValueOnce(new Error('Unknown error'));

      expect(authService.registerUser(payload)).rejects.toThrow('Failed to register an user');
    });

    it('should throw 409 if user already exists', async () => {
      const pgError = Object.assign(new postgres.PostgresError('duplicate key value'), {
        code: '23505',
      });
      const error = new DrizzleQueryError('', [], pgError);

      spyOn(authQuery, 'insertUser').mockRejectedValueOnce(error);

      expect(authService.registerUser(payload)).rejects.toThrow('User already exists');
    });
  });
});
