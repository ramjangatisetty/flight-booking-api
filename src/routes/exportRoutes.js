const express = require('express');
const { authenticate } = require('../middleware/auth');
const exportController = require('../controllers/exportController');

const router = express.Router();

router.post('/bookings', authenticate, exportController.startExport);
router.get('/jobs/:id', authenticate, exportController.getExportJob);

module.exports = router;
