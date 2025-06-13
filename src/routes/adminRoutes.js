const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const flightController = require('../controllers/flightController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Flights CRUD
router.post('/flights', authenticate, authorize(['admin']), flightController.createFlight);
router.put('/flights/:id', authenticate, authorize(['admin']), flightController.updateFlight);
router.delete('/flights/:id', authenticate, authorize(['admin']), flightController.deleteFlight);

// Bookings reporting
router.get('/bookings', authenticate, authorize(['admin']), bookingController.getAllBookings);

// List all flights (admin view)
router.get('/flights', authenticate, authorize(['admin']), flightController.listFlights);

module.exports = router;
