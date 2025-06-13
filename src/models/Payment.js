const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  amount: Number,
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' },
  method: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
