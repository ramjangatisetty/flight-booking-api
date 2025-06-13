const { create2FACode, verify2FACode } = require('../utils/twofa');
const Booking = require('../models/Booking');

// Request a 2FA code
const request2FA = async (req, res) => {
  await create2FACode(req.user, 'email'); // Or 'sms'
  res.json({ message: '2FA code sent' });
};

// Confirm booking with 2FA
const confirmBookingWith2FA = async (req, res) => {
  const { code } = req.body;
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  const valid = await verify2FACode(req.user, code);
  if (!valid) return res.status(401).json({ error: 'Invalid or expired 2FA code' });

  booking.status = 'confirmed';
  await booking.save();
  res.json({ message: 'Booking confirmed with 2FA', booking });
};

module.exports = { request2FA, confirmBookingWith2FA };
