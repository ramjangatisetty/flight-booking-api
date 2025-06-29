const mongoose = require('mongoose');

const BagSchema = new mongoose.Schema({
  type: String,
  weightKg: Number
}, { _id: false });

const SpecialRequestSchema = new mongoose.Schema({
  type: String,
  details: String
}, { _id: false });

const PassengerSchema = new mongoose.Schema({
  name: String,
  passport: String,
  bags: [BagSchema],
  specialRequests: [SpecialRequestSchema]
}, { _id: false });

const SegmentSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  departure: Date,
  arrival: Date,
  aircraft: {
    type: { type: String },
    seats: {
      economy: Number,
      business: Number
    }
  }
}, { _id: false });

const FlightSchema = new mongoose.Schema({
  id: String,
  flightNumber: String,
  segments: [SegmentSchema]
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  phone: String,
  loyalty: {
    number: String,
    status: String
  },
  preferences: {
    seat: String,
    meals: [String]
  }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  profile: ProfileSchema
}, { _id: false });

const TransactionSchema = new mongoose.Schema({
  id: String,
  status: String,
  timestamp: Date,
  processor: {
    name: String,
    authCode: String
  }
}, { _id: false });

const PaymentSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  method: String,
  transactions: [TransactionSchema]
}, { _id: false });

const HistorySchema = new mongoose.Schema({
  status: String,
  timestamp: Date,
  by: String
}, { _id: false });

const BookingSchema = new mongoose.Schema({
  status: String,
  user: UserSchema,
  flight: FlightSchema,
  passengers: [PassengerSchema],
  payment: PaymentSchema,
  history: [HistorySchema]
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
