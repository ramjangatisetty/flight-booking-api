const mongoose = require('mongoose');
const ExportJobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resource: String, // e.g., "bookings"
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  downloadUrl: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ExportJob', ExportJobSchema);
