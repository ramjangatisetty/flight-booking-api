const mongoose = require('mongoose');
const OAuthClientSchema = new mongoose.Schema({
  clientId: { type: String, unique: true },
  clientSecret: String,
  redirectUris: [String],
  name: String,
  scopes: [String]
});
module.exports = mongoose.model('OAuthClient', OAuthClientSchema);
