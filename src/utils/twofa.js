const TwoFACode = require('../models/TwoFACode');
const { sendEmail, sendSMS } = require('../services/notificationService');

const create2FACode = async (user, type = 'email') => {
  const code = (Math.floor(100000 + Math.random() * 900000)).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await TwoFACode.create({ user: user._id, code, type, expiresAt });

  if (type === 'email') {
    await sendEmail(user.email, 'Your 2FA Code', `Your code is: ${code}`);
  } else {
    await sendSMS(user.phone, `Your 2FA code: ${code}`);
  }
};

const verify2FACode = async (user, code) => {
  const entry = await TwoFACode.findOne({
    user: user._id,
    code,
    used: false,
    expiresAt: { $gte: new Date() }
  });
  if (!entry) return false;
  entry.used = true;
  await entry.save();
  return true;
};

module.exports = { create2FACode, verify2FACode };
