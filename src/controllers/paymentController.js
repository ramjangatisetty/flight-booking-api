const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const { triggerWebhooks } = require('../utils/webhooks');
const { sendEmail } = require('../services/notificationService');

// Simulate async payment (pending, then confirmed/failed)
const asyncPayment = async (req, res) => {
  const { bookingId, amount, status: desiredStatus } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  booking.paymentStatus = 'pending';
  booking.status = 'pending';
  await booking.save();

  const payment = await Payment.create({
    booking: booking._id,
    amount,
    currency: booking.currency,
    status: 'pending',
    method: 'card'
  });

  res.status(202).json({ message: 'Payment processing started', booking, payment });

  setTimeout(async () => {
    booking.paymentStatus = desiredStatus || 'successful';
    booking.status = booking.paymentStatus === 'successful' ? 'confirmed' : 'failed';
    await booking.save();
    payment.status = booking.paymentStatus;
    await payment.save();

    await triggerWebhooks('PAYMENT_UPDATED', { booking, payment });
    await sendEmail(booking.user.email, 'Payment Update', `Booking ${booking._id} is now ${booking.status}.`);
  }, 7000);
};

module.exports = { asyncPayment };
