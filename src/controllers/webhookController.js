const Webhook = require('../models/Webhook');

// Register webhook
const registerWebhook = async (req, res) => {
  const { url, event } = req.body;
  if (!url || !event) return res.status(400).json({ error: 'URL and event required' });
  const webhook = await Webhook.create({ url, event });
  res.status(201).json(webhook);
};

// List all webhooks
const listWebhooks = async (req, res) => {
  const hooks = await Webhook.find();
  res.json(hooks);
};

// Delete webhook
const deleteWebhook = async (req, res) => {
  await Webhook.findByIdAndDelete(req.params.id);
  res.json({ message: 'Webhook deleted' });
};

module.exports = { registerWebhook, listWebhooks, deleteWebhook };
