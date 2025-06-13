const BookingFile = require('../models/BookingFile');

// List files for a booking
const listFiles = async (req, res) => {
  const files = await BookingFile.find({ booking: req.params.id });
  res.json(files);
};

// Download file for a booking
const downloadFile = async (req, res) => {
  const file = await BookingFile.findById(req.params.fileId);
  if (!file) return res.status(404).json({ error: 'File not found' });
  res.download(file.path, file.originalname);
};

module.exports = { listFiles, downloadFile };
