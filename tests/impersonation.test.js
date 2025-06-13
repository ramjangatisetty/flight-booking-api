const request = require('supertest');
const app = require('../src/app');
let server, adminToken, travelerId;

beforeAll(async () => {
  server = app.listen(4006);
  // Register admin
  await request(server).post('/api/v1/users/register')
    .send({ name: 'Admin', email: 'admin@impersonate.com', password: 'admin123', role: 'admin' });
  const res = await request(server).post('/api/v1/users/login')
    .send({ email: 'admin@impersonate.com', password: 'admin123' });
  adminToken = res.body.token;

  // Register a traveler
  const travelerRes = await request(server).post('/api/v1/users/register')
    .send({ name: 'Traveler', email: 'traveler@impersonate.com', password: 'trav123' });
  travelerId = travelerRes.body.user._id;
});

afterAll(done => server.close(done));

describe('Impersonation', () => {
  it('admin should impersonate traveler and get JWT', async () => {
    const res = await request(server)
      .post('/api/v1/users/impersonate')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ userId: travelerId });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(res.body.impersonated).toBe('traveler@impersonate.com');
  });
});
