const request = require('supertest');
const app = require('../src/app');
let server, token;

beforeAll(async () => {
  server = app.listen(4004);
  await request(server).post('/api/v1/users/register')
    .send({ name: 'Rate Limit', email: 'ratelimit@test.com', password: 'rate123' });
  const res = await request(server).post('/api/v1/users/login')
    .send({ email: 'ratelimit@test.com', password: 'rate123' });
  token = res.body.token;
});

afterAll(done => server.close(done));

describe('Rate limiting', () => {
  it('should limit requests after threshold', async () => {
    let lastRes;
    for (let i = 0; i < 12; i++) {
      lastRes = await request(server)
        .get('/api/v1/flights')
        .set('Authorization', `Bearer ${token}`);
    }
    expect(lastRes.statusCode).toBe(429);
    expect(lastRes.body.error).toMatch(/Too many requests/);
  });
});
