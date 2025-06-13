const mongoose = require('mongoose');

const TwoFACodeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  code: String,
  type: { type: String, enum: ['email', 'sms'], default: 'email' },
  expiresAt: Date,
  used: { type: Boolean, default: false }
});

module.exports = mongoose.model('TwoFACode', TwoFACodeSchema);
