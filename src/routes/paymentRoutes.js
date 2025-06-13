const express = require('express');
const { authenticate } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/async', authenticate, paymentController.asyncPayment);

module.exports = router;
