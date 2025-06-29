const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' });

const User = require('../models/User');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flight_booking');

  // Clean up
  await User.deleteMany({});
  await Flight.deleteMany({});
  await Booking.deleteMany({});

  // Create admin and test user
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@flight.com',
    password: 'admin123',
    role: 'admin',
    phone: '5551001'
  });
  const traveler = await User.create({
    name: 'Test Traveler',
    email: 'traveler@flight.com',
    password: 'traveler123',
    role: 'traveler',
    phone: '5552002'
  });

  // Add some flights
  const flights = await Flight.create([
    {
      flightNumber: 'AA100',
      source: 'JFK',
      destination: 'LAX',
      departure: new Date(Date.now() + 86400000), // 1 day from now
      arrival: new Date(Date.now() + 86400000 + 6 * 3600000), // +6 hours
      duration: '6h',
      class: ['economy', 'business'],
      price: 450,
      seatsAvailable: 60
    },
    {
      flightNumber: 'UA200',
      source: 'ORD',
      destination: 'SFO',
      departure: new Date(Date.now() + 2 * 86400000),
      arrival: new Date(Date.now() + 2 * 86400000 + 4 * 3600000),
      duration: '4h',
      class: ['economy', 'business'],
      price: 380,
      seatsAvailable: 55
    }
  ]);

  // Create a nested complex booking
  await Booking.create({
    status: 'confirmed',
    user: {
      id: 'usr_1001',
      name: 'Alice Smith',
      email: 'alice@example.com',
      profile: {
        phone: '+1-555-1234',
        loyalty: {
          number: 'AAL1234567',
          status: 'Platinum'
        },
        preferences: {
          seat: 'aisle',
          meals: ['vegetarian', 'kosher']
        }
      }
    },
    flight: {
      id: 'flt_555',
      flightNumber: 'UA200',
      segments: [
        {
          origin: 'ORD',
          destination: 'SFO',
          departure: flights[1].departure,
          arrival: flights[1].arrival,
          aircraft: {
            type: 'Boeing 777',
            seats: { economy: 250, business: 30 }
          }
        }
      ]
    },
    passengers: [
      {
        name: 'Alice Smith',
        passport: 'X12345678',
        bags: [
          { type: 'checked', weightKg: 23 },
          { type: 'carry-on', weightKg: 7 }
        ],
        specialRequests: [
          { type: 'wheelchair', details: 'needs assistance at boarding' }
        ]
      },
      {
        name: 'Bob Smith',
        passport: 'Y99887766',
        bags: [
          { type: 'checked', weightKg: 20 }
        ],
        specialRequests: []
      }
    ],
    payment: {
      amount: 1150.00,
      currency: 'USD',
      method: 'credit_card',
      transactions: [
        {
          id: 'txn_001',
          status: 'success',
          timestamp: new Date('2025-06-14T13:00:00Z'),
          processor: {
            name: 'Stripe',
            authCode: 'ST123X'
          }
        }
      ]
    },
    history: [
      {
        status: 'created',
        timestamp: new Date('2025-06-14T12:00:00Z'),
        by: 'system'
      },
      {
        status: 'confirmed',
        timestamp: new Date('2025-06-14T12:05:00Z'),
        by: 'user'
      }
    ]
  });

  console.log('Seeded admin, traveler, flights, and a complex booking!');
  await mongoose.disconnect();
};

seed();
