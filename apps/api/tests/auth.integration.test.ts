import { beforeAll, afterAll, beforeEach, describe, it, expect } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index.js';
import { AuditLog, Project, User, Assessment, Approval, MitigationAction, ComplianceRequirement, Inspection, Notification, Document } from '../src/models.js';

const testUri = process.env.MONGODB_TEST_URI;
const integration = describe.skipIf(!testUri);

integration('multi-user authentication and project isolation (requires MONGODB_TEST_URI)', () => {
  beforeAll(async () => {
    if (!testUri) return;
    const databaseName = new URL(testUri).pathname.replace(/^\//, '');
    if (!databaseName.endsWith('ecotrack_test')) {
      throw new Error('MONGODB_TEST_URI must point to a dedicated database whose name ends with ecotrack_test');
    }
    await mongoose.connect(testUri);
  });

  beforeEach(async () => {
    await Promise.all([User.deleteMany({}), Project.deleteMany({}), Assessment.deleteMany({}), Approval.deleteMany({}), MitigationAction.deleteMany({}), ComplianceRequirement.deleteMany({}), Inspection.deleteMany({}), AuditLog.deleteMany({}), Notification.deleteMany({}), Document.deleteMany({})]);
  });

  afterAll(async () => {
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  });

  it('registers, persists, authenticates, and logs out a user without exposing a password hash', async () => {
    const agent = request.agent(app);
    const registration = await agent.post('/api/v1/auth/register').send({
      name: 'Test Account',
      email: '  TEST@example.com ',
      password: 'StrongPass!2026',
    });
    expect(registration.status).toBe(201);
    expect(registration.body.user.email).toBe('test@example.com');
    expect(JSON.stringify(registration.body)).not.toContain('passwordHash');
    expect(registration.headers['set-cookie']?.[0]).toContain('ecotrack_session');

    const stored = await User.findOne({ email: 'test@example.com' }).select('+passwordHash');
    expect(stored).not.toBeNull();
    expect(stored!.passwordHash).not.toBe('StrongPass!2026');

    expect((await agent.get('/api/v1/auth/me')).status).toBe(200);
    expect((await agent.post('/api/v1/auth/logout')).status).toBe(200);
    expect((await agent.get('/api/v1/auth/me')).status).toBe(401);
  });

  it('rejects duplicate email addresses and invalid passwords', async () => {
    const payload = { name: 'Test Account', email: 'test@example.com', password: 'StrongPass!2026' };
    expect((await request(app).post('/api/v1/auth/register').send(payload)).status).toBe(201);
    expect((await request(app).post('/api/v1/auth/register').send({ ...payload, email: ' TEST@example.com ' })).status).toBe(409);
    expect((await request(app).post('/api/v1/auth/login').send({ email: payload.email, password: 'WrongPass!2026' })).status).toBe(401);
  });

  it('keeps projects isolated between two registered users', async () => {
    const first = request.agent(app);
    const second = request.agent(app);
    await first.post('/api/v1/auth/register').send({ name: 'First User', email: 'first@example.com', password: 'StrongPass!2026' }).expect(201);
    await second.post('/api/v1/auth/register').send({ name: 'Second User', email: 'second@example.com', password: 'StrongPass!2026' }).expect(201);

    const created = await first.post('/api/v1/projects').send({ name: 'First User Project', code: 'TEST-FIRST', location: 'Chennai' }).expect(201);
    const secondProjects = await second.get('/api/v1/projects').expect(200);
    expect(secondProjects.body.total).toBe(0);
    await second.get(`/api/v1/projects/${created.body.id}`).expect(403);
  });

  it('persists environmental CRUD records and prevents cross-user access', async () => {
    const owner = request.agent(app);
    const other = request.agent(app);
    await owner.post('/api/v1/auth/register').send({ name: 'Record Owner', email: 'owner@example.com', password: 'StrongPass!2026' }).expect(201);
    await other.post('/api/v1/auth/register').send({ name: 'Other User', email: 'other@example.com', password: 'StrongPass!2026' }).expect(201);
    const project = await owner.post('/api/v1/projects').send({ name: 'Persisted Test Project', code: 'PERSIST-1', location: 'Chennai' }).expect(201);
    const record = await owner.post('/api/v1/compliance').send({
      projectId: project.body.id,
      title: 'Persisted compliance requirement',
      reference: 'CMP-PERSIST-1',
      description: 'A record that must survive a new API request',
      status: 'NOT_STARTED',
    }).expect(201);
    const read = await owner.get('/api/v1/compliance').expect(200);
    expect(read.body.some((row: any) => row.id === record.body.id)).toBe(true);
    await owner.patch(`/api/v1/compliance/${record.body.id}`).send({ status: 'IN_PROGRESS' }).expect(200);
    const updated = await owner.get('/api/v1/compliance').expect(200);
    expect(updated.body.find((row: any) => row.id === record.body.id)?.status).toBe('IN_PROGRESS');
    await other.get(`/api/v1/projects/${project.body.id}`).expect(403);
    await other.post('/api/v1/compliance').send({ projectId: project.body.id, title: 'Unauthorized record' }).expect(403);
    await owner.delete(`/api/v1/compliance/${record.body.id}`).expect(200);
    const afterDelete = await owner.get('/api/v1/compliance').expect(200);
    expect(afterDelete.body.some((row: any) => row.id === record.body.id)).toBe(false);
  });

  it('supports administrator user CRUD and protects the last active administrator', async () => {
    const argon2 = await import('argon2');
    await User.create({ name: 'Test Administrator', email: 'admin-test@example.com', passwordHash: await argon2.hash('StrongPass!2026'), role: 'ADMIN' });
    const admin = request.agent(app);
    await admin.post('/api/v1/auth/login').send({ email: 'admin-test@example.com', password: 'StrongPass!2026' }).expect(200);
    const created = await admin.post('/api/v1/users').send({ name: 'Managed User', email: 'managed@example.com', password: 'ManagedPass!2026', role: 'VIEWER' }).expect(201);
    expect(created.body.role).toBe('VIEWER');
    const viewer = request.agent(app);
    await viewer.post('/api/v1/auth/login').send({ email: 'managed@example.com', password: 'ManagedPass!2026' }).expect(200);
    await viewer.get('/api/v1/users').expect(403);
    await viewer.post('/api/v1/projects').send({ name: 'Forbidden Project', code: 'FORBIDDEN-1', location: 'Chennai' }).expect(403);
    await admin.patch(`/api/v1/users/${created.body.id}`).send({ name: 'Updated Managed User', role: 'APPROVER' }).expect(200);
    expect((await User.findById(created.body.id))?.role).toBe('APPROVER');
    await admin.delete(`/api/v1/users/${created.body.id}`).expect(200);
    expect(await User.findById(created.body.id)).toBeNull();
    await admin.patch(`/api/v1/users/${String((await User.findOne({ email: 'admin-test@example.com' }))!.id)}`).send({ active: false }).expect(409);
  });

});
