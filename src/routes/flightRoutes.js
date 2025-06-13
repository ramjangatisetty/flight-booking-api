const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const flightController = require('../controllers/flightController');

const router = express.Router();

router.get('/', flightController.listFlights);
router.get('/:id', flightController.getFlight);

router.post('/', authenticate, authorize(['admin', 'flight_manager']), flightController.createFlight);
router.put('/:id', authenticate, authorize(['admin', 'flight_manager']), flightController.updateFlight);
router.delete('/:id', authenticate, authorize(['admin', 'flight_manager']), flightController.softDeleteFlight);
router.post('/:id/restore', authenticate, authorize(['admin', 'flight_manager']), flightController.restoreFlight);

router.post('/bulk', authenticate, authorize(['admin', 'flight_manager']), flightController.bulkCreateFlights);

module.exports = router;
