import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/index.js';

describe('API health', () => {
  it('returns service status without requiring database access', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.service).toBe('ecotrack-api');
  });
});
