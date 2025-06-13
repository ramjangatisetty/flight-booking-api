const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, unique: true },
  source: String,
  destination: String,
  departure: Date,
  arrival: Date,
  duration: String,
  class: [String],
  price: Number,
  currency: { type: String, default: 'USD' },
  seatsAvailable: Number,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Flight', FlightSchema);
