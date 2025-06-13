const Booking = require('../models/Booking');
const { logAudit } = require('../utils/audit');

// Create booking
const createBooking = async (req, res) => {
  const booking = new Booking({
    ...req.body,
    user: req.user.id
  });
  await booking.save();
  await logAudit({ user: req.user.id, resource: 'Booking', action: 'CREATE', resourceId: booking._id, after: booking });
  res.status(201).json(booking);
};

// List bookings (admin)
const listAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user flight');
  res.json(bookings);
};

// Get my bookings (traveler)
const myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('flight');
  res.json(bookings);
};

// Soft delete booking
const softDeleteBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
  if (!booking || !booking.isActive)
    return res.status(404).json({ error: 'Booking not found' });
  booking.isActive = false;
  await booking.save();
  await logAudit({ user: req.user.id, resource: 'Booking', action: 'SOFT_DELETE', resourceId: booking._id, before: booking });
  res.json({ message: 'Booking soft deleted', booking });
};

// Restore booking
const restoreBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  booking.isActive = true;
  await booking.save();
  await logAudit({ user: req.user.id, resource: 'Booking', action: 'RESTORE', resourceId: booking._id, after: booking });
  res.json({ message: 'Booking restored', booking });
};

// Cancel booking
const cancelBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
  if (!booking || !booking.isActive)
    return res.status(404).json({ error: 'Booking not found' });
  booking.status = 'cancelled';
  await booking.save();
  await logAudit({ user: req.user.id, resource: 'Booking', action: 'CANCEL', resourceId: booking._id, after: booking });
  res.json({ message: 'Booking cancelled' });
};

// Booking status (for polling async updates)
const getBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json({ status: booking.status, paymentStatus: booking.paymentStatus });
};

module.exports = {
  createBooking,
  listAllBookings,
  myBookings,
  softDeleteBooking,
  restoreBooking,
  cancelBooking,
  getBookingStatus
};
