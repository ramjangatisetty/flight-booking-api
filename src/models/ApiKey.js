const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  key: { type: String, unique: true },
  scopes: [String],
  active: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('ApiKey', ApiKeySchema);
