const Booking = require('../models/Booking');

// Create a new booking (accepts nested objects!)
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bookings (with pagination and optional deep population for more realism)
const listBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const bookings = await Booking.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single booking by ID
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a booking (partial update allowed)
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete a booking (mark as inactive)
const softDeleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Restore a booking (if cancelled)
const restoreBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    booking.status = 'confirmed';
    await booking.save();
    res.json({ message: 'Booking restored' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload a file for a booking (dummy handler, just for endpoint coverage)
const uploadBookingFile = async (req, res) => {
  // Assuming you use multer or similar for file upload
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(201).json({
    message: 'File uploaded',
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  });
};

// List files for a booking (placeholder)
const listBookingFiles = async (req, res) => {
  res.json([{ id: 'file1', name: 'e-ticket.pdf' }]);
};

// Download file for a booking (placeholder)
const downloadBookingFile = async (req, res) => {
  res.send('This would be your file.');
};

module.exports = {
  createBooking,
  listBookings,
  getBooking,
  updateBooking,
  softDeleteBooking,
  restoreBooking,
  uploadBookingFile,
  listBookingFiles,
  downloadBookingFile
};
