const Flight = require('../models/Flight');

// List flights (with pagination, filtering, sorting)
const listFlights = async (req, res) => {
  const { page = 1, limit = 10, sort = 'departure', source, destination } = req.query;
  const query = { isActive: true };
  if (source) query.source = source;
  if (destination) query.destination = destination;

  const flights = await Flight.find(query)
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(flights);
};

// Get a flight by ID
const getFlight = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight || !flight.isActive)
    return res.status(404).json({ error: 'Flight not found' });
  res.json(flight);
};

// Create flight (admin)
const createFlight = async (req, res) => {
  const flight = new Flight(req.body);
  await flight.save();
  res.status(201).json(flight);
};

// Update flight (admin)
const updateFlight = async (req, res) => {
  const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!flight) return res.status(404).json({ error: 'Flight not found' });
  res.json(flight);
};

// Soft delete flight (admin)
const softDeleteFlight = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight) return res.status(404).json({ error: 'Flight not found' });
  flight.isActive = false;
  await flight.save();
  res.json({ message: 'Flight soft deleted' });
};

// Restore flight (admin)
const restoreFlight = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight) return res.status(404).json({ error: 'Flight not found' });
  flight.isActive = true;
  await flight.save();
  res.json({ message: 'Flight restored' });
};

// Bulk create flights (admin/flight_manager)
const bulkCreateFlights = async (req, res) => {
  try {
    const flights = await Flight.insertMany(req.body);
    res.status(201).json(flights);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  listFlights,
  getFlight,
  createFlight,
  updateFlight,
  softDeleteFlight,
  restoreFlight,
  bulkCreateFlights
};
