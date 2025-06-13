const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resource: String, // e.g., "Booking"
  action: String,   // e.g., "CREATE", "UPDATE"
  resourceId: String,
  before: { type: Object },
  after: { type: Object },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
