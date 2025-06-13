const express = require('express');
const { authenticate } = require('../middleware/auth');
const apiKeyController = require('../controllers/apiKeyController');

const router = express.Router();

router.post('/', authenticate, apiKeyController.createApiKey);
router.get('/', authenticate, apiKeyController.listApiKeys);
router.delete('/:id', authenticate, apiKeyController.revokeApiKey);

module.exports = router;
