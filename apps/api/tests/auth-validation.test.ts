import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/index.js';

describe('public registration validation', () => {
  it('rejects malformed registration before touching the database', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      name: 'A',
      email: 'not-an-email',
      password: 'weak',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  it('requires a strong password', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'alllowercase123',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('uppercase');
  });
});
