const ExportJob = require('../models/ExportJob');
const Booking = require('../models/Booking');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

// POST /api/v1/export/bookings
const startExport = async (req, res) => {
  const job = await ExportJob.create({ user: req.user._id, resource: 'bookings', status: 'pending' });
  res.status(202).json({ jobId: job._id });

  // Simulate export job
  setTimeout(async () => {
    job.status = 'processing';
    await job.save();
    // Export all bookings for user as CSV
    const bookings = await Booking.find({ user: req.user._id }).lean();
    const parser = new Parser();
    const csv = parser.parse(bookings);
    const filename = `booking-export-${job._id}.csv`;
    const filepath = path.join(__dirname, '../../exports/', filename);
    fs.writeFileSync(filepath, csv);
    job.status = 'completed';
    job.downloadUrl = `/exports/${filename}`;
    await job.save();
  }, 5000);
};

// GET /api/v1/export/jobs/:id
const getExportJob = async (req, res) => {
  const job = await ExportJob.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
};
module.exports = { startExport, getExportJob };
