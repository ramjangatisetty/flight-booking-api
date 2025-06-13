const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
let server, token, bookingId;

beforeAll(async () => {
  server = app.listen(4007);
  await request(server).post('/api/v1/users/register')
    .send({ name: 'File User', email: 'fileuser@test.com', password: 'filepass' });
  const res = await request(server).post('/api/v1/users/login')
    .send({ email: 'fileuser@test.com', password: 'filepass' });
  token = res.body.token;

  // Book a flight
  const flights = await request(server).get('/api/v1/flights');
  const bookingRes = await request(server)
    .post('/api/v1/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send({ flight: flights.body[0]._id, passengers: [{ name: "FU", age: 27, passport: "PPX1234" }] });
  bookingId = bookingRes.body._id;
});

afterAll(done => server.close(done));

describe('File upload for booking', () => {
  it('should upload a file', async () => {
    fs.writeFileSync('dummy.txt', 'File contents');
    const res = await request(server)
      .post(`/api/v1/bookings/${bookingId}/upload`)
      .set('Authorization', `Bearer ${token}`)
      .attach('file', 'dummy.txt');
    expect(res.statusCode).toBe(201);
    expect(res.body.originalname).toBe('dummy.txt');
    fs.unlinkSync('dummy.txt');
  });
});
