const request = require('supertest');
const app = require('../src/app');
let server, token;

beforeAll(async () => {
  server = app.listen(4002);
  // Register and login to get token
  await request(server).post('/api/v1/users/register')
    .send({ name: '2FA User', email: '2fauser@test.com', password: 'pass2fa' });
  const res = await request(server).post('/api/v1/users/login')
    .send({ email: '2fauser@test.com', password: 'pass2fa' });
  token = res.body.token;
});

afterAll(done => server.close(done));

describe('2FA endpoints', () => {
  it('should request a 2FA code', async () => {
    const res = await request(server)
      .post('/api/v1/users/me/request-2fa')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/2FA code sent/);
  });
});
