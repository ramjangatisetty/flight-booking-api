const mongoose = require('mongoose');
const OAuthTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'OAuthClient' },
  code: String,
  accessToken: String,
  refreshToken: String,
  scopes: [String],
  expiresAt: Date,
  type: { type: String, enum: ['authorization_code', 'access_token', 'refresh_token'] }
});
module.exports = mongoose.model('OAuthToken', OAuthTokenSchema);
