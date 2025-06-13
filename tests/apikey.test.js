const request = require('supertest');
const app = require('../src/app');
let server, token, apiKey;

beforeAll(async () => {
  server = app.listen(4005);
  await request(server).post('/api/v1/users/register')
    .send({ name: 'API Key', email: 'apikey@test.com', password: 'api123' });
  const res = await request(server).post('/api/v1/users/login')
    .send({ email: 'apikey@test.com', password: 'api123' });
  token = res.body.token;

  // Create an API key
  const keyRes = await request(server)
    .post('/api/v1/apikeys')
    .set('Authorization', `Bearer ${token}`)
    .send({});
  apiKey = keyRes.body.key;
});

afterAll(done => server.close(done));

describe('API Key Authentication', () => {
  it('should allow access using API key header', async () => {
    const res = await request(server)
      .get('/api/v1/flights')
      .set('x-api-key', apiKey);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
