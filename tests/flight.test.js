const request = require('supertest');
const app = require('../src/app');
let server;

beforeAll(() => {
  server = app.listen(4001);
});

afterAll(done => {
  server.close(done);
});

describe('Flight API', () => {
  it('should list flights', async () => {
    const res = await request(server).get('/api/v1/flights');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
