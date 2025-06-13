const Webhook = require('../models/Webhook');
const axios = require('axios');

const triggerWebhooks = async (event, payload) => {
  const hooks = await Webhook.find({ event });
  for (const hook of hooks) {
    try {
      await axios.post(hook.url, payload);
    } catch (e) {
      console.error(`[Webhook] Failed: ${hook.url} - ${e.message}`);
    }
  }
};
module.exports = { triggerWebhooks };
