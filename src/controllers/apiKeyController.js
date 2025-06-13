const ApiKey = require('../models/ApiKey');
const crypto = require('crypto');

// Create API key
const createApiKey = async (req, res) => {
  const key = crypto.randomBytes(32).toString('hex');
  const apiKey = await ApiKey.create({ user: req.user._id, key, scopes: req.body.scopes || [] });
  res.status(201).json(apiKey);
};

// List keys
const listApiKeys = async (req, res) => {
  const keys = await ApiKey.find({ user: req.user._id });
  res.json(keys);
};

// Revoke key
const revokeApiKey = async (req, res) => {
  await ApiKey.findByIdAndDelete(req.params.id);
  res.json({ message: 'API key revoked' });
};

module.exports = { createApiKey, listApiKeys, revokeApiKey };
