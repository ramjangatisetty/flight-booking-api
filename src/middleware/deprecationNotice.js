module.exports = (req, res, next) => {
  res.set('X-API-Deprecation', 'true');
  next();
};
