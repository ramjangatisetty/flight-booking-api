const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  passport: String,
  seat: String
});

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  passengers: [PassengerSchema],
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'failed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
