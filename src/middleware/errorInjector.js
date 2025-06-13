let errorMode = false;

const errorInjector = (req, res, next) => {
  if (req.query.forceError === '500') return res.status(500).json({ error: 'Injected server error' });
  if (req.query.forceError === '429') return res.status(429).json({ error: 'Injected rate limit error' });
  if (errorMode && Math.random() < 0.2) return res.status(500).json({ error: 'Random error for testing' });
  next();
};

module.exports = errorInjector;
module.exports.setErrorMode = (enabled) => { errorMode = enabled; };
