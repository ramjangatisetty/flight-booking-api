const ApiKey = require('../models/ApiKey');

module.exports = async (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (!key) return next();
  const apiKey = await ApiKey.findOne({ key, active: true });
  if (!apiKey) return res.status(401).json({ error: 'Invalid API key' });
  req.user = apiKey.user;
  apiKey.usageCount += 1;
  await apiKey.save();
  next();
};
