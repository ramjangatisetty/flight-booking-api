const mongoose = require('mongoose');

const WebhookSchema = new mongoose.Schema({
  url: { type: String, required: true },
  event: { type: String, required: true }, // e.g. "BOOKING_CREATED"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Webhook', WebhookSchema);
