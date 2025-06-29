const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      // Duplicate email (unique index)
      return res.status(409).json({ error: 'Email already exists' });
    }
    // Other errors (validation, etc.)
    res.status(400).json({ error: err.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, isActive: true });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, role: user.role, permissions: user.permissions },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
  res.json({ token, user });
};

const me = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

const listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

module.exports = { register, login, me, listUsers };
