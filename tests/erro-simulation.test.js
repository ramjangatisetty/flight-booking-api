const request = require('supertest');
const app = require('../src/app');
let server, token;

beforeAll(async () => {
  server = app.listen(4008);
  await request(server).post('/api/v1/users/register')
    .send({ name: 'Error Sim', email: 'errorsim@test.com', password: 'errpass' });
  const res = await request(server).post('/api/v1/users/login')
    .send({ email: 'errorsim@test.com', password: 'errpass' });
  token = res.body.token;
});

afterAll(done => server.close(done));

describe('Error simulation middleware', () => {
  it('should inject 500 error on request with forceError', async () => {
    const res = await request(server)
      .get('/api/v1/flights?forceError=500')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Injected server error');
  });
});
