const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const auditController = require('../controllers/auditController');

const router = express.Router();

router.get('/', authenticate, authorize(['admin']), auditController.listAuditLogs);
router.get('/:id', authenticate, authorize(['admin']), auditController.getAuditLog);

module.exports = router;
