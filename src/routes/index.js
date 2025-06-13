const express = require('express');
const userRoutes = require('./userRoutes');
const flightRoutes = require('./flightRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./paymentRoutes');
const auditRoutes = require('./auditRoutes');
const webhookRoutes = require('./webhookRoutes');
const apiKeyRoutes = require('./apikeyRoutes');
const exportRoutes = require('./exportRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/flights', flightRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/audit', auditRoutes);
router.use('/webhooks', webhookRoutes);
router.use('/apikeys', apiKeyRoutes);
router.use('/export', exportRoutes);

module.exports = router;