const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, name, password, role } = req.body;
  if (!email || !password || !name)
    return res.status(400).json({ error: 'Email, name, password required' });

  try {
    const user = new User({ email, name, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered', user: { email, name, role: user.role } });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await user.comparePassword(password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });

  res.json({ token, user: { email: user.email, name: user.name, role: user.role } });
};

module.exports = { register, login };
