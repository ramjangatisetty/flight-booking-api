let mockMode = false;

const mockMiddleware = (req, res, next) => {
  if (mockMode) {
    if (req.path.startsWith('/api/v1/flights')) {
      return res.json([
        { flightNumber: 'MOCK123', source: 'XXX', destination: 'YYY', price: 0 }
      ]);
    }
    // Add more canned responses for other endpoints if needed
  }
  next();
};

mockMiddleware.setMockMode = (enabled) => { mockMode = enabled; };
module.exports = mockMiddleware;
