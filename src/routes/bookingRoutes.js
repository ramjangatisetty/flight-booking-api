const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');
const twofaController = require('../controllers/twofaController');
const bookingFileController = require('../controllers/bookingFileController');
const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: path.join(__dirname, '../../uploads/')
});

const router = express.Router();

router.post('/', authenticate, bookingController.createBooking);
router.get('/', authenticate, authorize(['admin']), bookingController.listAllBookings);
router.get('/me', authenticate, bookingController.myBookings);

router.delete('/:id', authenticate, bookingController.softDeleteBooking);
router.post('/:id/restore', authenticate, bookingController.restoreBooking);
router.patch('/:id/cancel', authenticate, bookingController.cancelBooking);

router.get('/:id/status', authenticate, bookingController.getBookingStatus);

// File upload/download
router.post('/:id/upload', authenticate, upload.single('file'), async (req, res) => {
  const BookingFile = require('../models/BookingFile');
  const bookingFile = await BookingFile.create({
    booking: req.params.id,
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    path: req.file.path
  });
  res.status(201).json(bookingFile);
});
router.get('/:id/files', authenticate, bookingFileController.listFiles);
router.get('/:id/files/:fileId', authenticate, bookingFileController.downloadFile);

// 2FA confirmation
router.post('/:id/confirm-2fa', authenticate, twofaController.confirmBookingWith2FA);

module.exports = router;
