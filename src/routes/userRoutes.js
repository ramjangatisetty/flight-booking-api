const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const userController = require('../controllers/userController');
const twofaController = require('../controllers/twofaController');
const impersonationController = require('../controllers/impersonationController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/me', authenticate, userController.me);
router.get('/', authenticate, authorize(['admin']), userController.listUsers);

// Two-factor auth
router.post('/me/request-2fa', authenticate, twofaController.request2FA);

// Impersonation (admin/support only)
router.post('/impersonate', authenticate, authorize(['admin', 'support']), impersonationController.impersonate);

module.exports = router;
