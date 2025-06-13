const jwt = require('jsonwebtoken');
const User = require('../models/User');

const impersonate = async (req, res) => {
  if (!req.body.userId) return res.status(400).json({ error: 'Target userId required' });
  const target = await User.findById(req.body.userId);
  if (!target) return res.status(404).json({ error: 'User not found' });

  // Only admins/support can impersonate
  if (!['admin', 'support'].includes(req.user.role)) return res.status(403).json({ error: 'Not authorized' });

  const token = jwt.sign(
    { id: target._id, role: target.role, impersonatedBy: req.user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token, impersonated: target.email });
};

module.exports = { impersonate };
