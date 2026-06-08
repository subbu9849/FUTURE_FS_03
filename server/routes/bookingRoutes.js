// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();

const {
  submitBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getBookingStats,
} = require('../controllers/bookingController');

const { protect, authorize } = require('../middleware/authMiddleware');
const {
  validateBooking,
  validateObjectId,
  validateStatusUpdate,
} = require('../middleware/validationMiddleware');

// ── Public routes ─────────────────────────────────────────────────────────────

// POST /api/booking  →  Submit a booking request
router.post('/', validateBooking, submitBooking);

// ── Protected routes (admin only) ────────────────────────────────────────────

// GET /api/booking/stats  →  Aggregated booking statistics (must be before /:id)
router.get('/stats', protect, getBookingStats);

// GET /api/booking  →  Get all bookings
router.get('/', protect, getAllBookings);

// GET /api/booking/:id  →  Get single booking
router.get('/:id', protect, validateObjectId('id'), getBookingById);

// PATCH /api/booking/:id/status  →  Update booking status
router.patch(
  '/:id/status',
  protect,
  validateObjectId('id'),
  validateStatusUpdate,
  updateBookingStatus
);

// DELETE /api/booking/:id  →  Delete single booking
router.delete('/:id', protect, validateObjectId('id'), deleteBooking);

module.exports = router;