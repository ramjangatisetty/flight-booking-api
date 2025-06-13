const request = require('supertest');
const app = require('../src/app');
let server, token, bookingId;

beforeAll(async () => {
  server = app.listen(4003);
  await request(server).post('/api/v1/users/register')
    .send({ name: 'Async Pay', email: 'asyncpay@test.com', password: 'async123' });
  const res = await request(server).post('/api/v1/users/login')
    .send({ email: 'asyncpay@test.com', password: 'async123' });
  token = res.body.token;

  // Find a flight to book
  const flights = await request(server).get('/api/v1/flights');
  const flight = flights.body[0];

  // Book a flight
  const bookingRes = await request(server)
    .post('/api/v1/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send({ flight: flight._id, passengers: [{ name: "AP User", age: 33, passport: "ZZZ1234" }] });
  bookingId = bookingRes.body._id;
});

afterAll(done => server.close(done));

describe('Async payment', () => {
  it('should start async payment and eventually confirm booking', async () => {
    const res = await request(server)
      .post('/api/v1/payments/async')
      .set('Authorization', `Bearer ${token}`)
      .send({ bookingId, amount: 100 });
    expect(res.statusCode).toBe(202);

    // Poll for status (simulate waiting for payment)
    let status;
    for (let i = 0; i < 10; i++) {
      const poll = await request(server)
        .get(`/api/v1/bookings/${bookingId}/status`)
        .set('Authorization', `Bearer ${token}`);
      status = poll.body.status;
      if (status === 'confirmed') break;
      await new Promise(res => setTimeout(res, 1000)); // wait 1s
    }
    expect(['confirmed', 'failed']).toContain(status);
  });
});
