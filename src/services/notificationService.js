// Dummy sendEmail/sendSMS functions for demo
// (You can wire up real SendGrid/Twilio using the API keys in .env)

const sendEmail = async (to, subject, text) => {
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}, Text: ${text}`);
};

const sendSMS = async (to, text) => {
  console.log(`[SMS] To: ${to}, Text: ${text}`);
};

module.exports = { sendEmail, sendSMS };
