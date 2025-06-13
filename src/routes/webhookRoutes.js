const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

// Register a new webhook (admin only)
router.post('/register', authenticate, authorize(['admin']), webhookController.registerWebhook);

// List all webhooks (admin only)
router.get('/', authenticate, authorize(['admin']), webhookController.listWebhooks);

// Delete a webhook (admin only)
router.delete('/:id', authenticate, authorize(['admin']), webhookController.deleteWebhook);

module.exports = router;

