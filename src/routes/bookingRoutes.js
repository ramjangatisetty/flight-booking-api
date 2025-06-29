const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Create booking (deeply nested JSON allowed!)
router.post('/', authenticate, bookingController.createBooking);

// List all bookings
router.get('/', authenticate, bookingController.listBookings);

// Get booking by ID
router.get('/:id', authenticate, bookingController.getBooking);

// Update a booking
router.put('/:id', authenticate, bookingController.updateBooking);

// Soft delete (cancel) booking
router.delete('/:id', authenticate, bookingController.softDeleteBooking);

// Restore booking
router.post('/:id/restore', authenticate, bookingController.restoreBooking);

// Upload booking file (multipart/form-data, file field 'file')
router.post('/:id/upload', authenticate, bookingController.uploadBookingFile);

// List/download files (dummy endpoints)
router.get('/:id/files', authenticate, bookingController.listBookingFiles);
router.get('/:id/files/:fileId', authenticate, bookingController.downloadBookingFile);

module.exports = router;
