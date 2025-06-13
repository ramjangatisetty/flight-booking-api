const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' });

const User = require('../models/User');
const Flight = require('../models/Flight');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flight_booking');

  // Clean up
  await User.deleteMany({});
  await Flight.deleteMany({});

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
  await Flight.create([
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

  console.log('Seeded admin, traveler, and flights!');
  await mongoose.disconnect();
};

seed();
