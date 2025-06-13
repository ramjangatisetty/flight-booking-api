const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per user or IP
  keyGenerator: req => req.user ? req.user.id : req.ip,
  handler: (req, res) => {
    res.set('X-RateLimit-Limit', 10);
    res.set('X-RateLimit-Remaining', 0);
    res.status(429).json({ error: 'Too many requests' });
  },
  headers: true
});
module.exports = limiter;
