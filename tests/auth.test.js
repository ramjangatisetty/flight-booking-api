const request = require('supertest');
const app = require('../src/app');
let server;

beforeAll(() => {
  server = app.listen(4000);
});

afterAll(done => {
  server.close(done);
});

describe('User Auth API', () => {
  it('should register and login', async () => {
    const res = await request(server)
      .post('/api/v1/users/register')
      .send({
        name: "Test User",
        email: "testuser@flight.com",
        password: "testpass"
      });
    expect(res.statusCode).toBe(201);

    const loginRes = await request(server)
      .post('/api/v1/users/login')
      .send({
        email: "testuser@flight.com",
        password: "testpass"
      });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeTruthy();
  });
});
