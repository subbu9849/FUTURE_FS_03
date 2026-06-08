// controllers/bookingController.js
// Business logic for photography booking requests

const Booking = require('../models/Booking');
const {
  asyncHandler,
  getPagination,
  paginatedResponse,
  getClientIP,
} = require('../utils/helpers');

// ── POST /api/booking ─────────────────────────────────────────────────────────
// Public: Submit a new booking request
const submitBooking = asyncHandler(async (req, res) => {
  const { name, email, phone, eventType, eventDate, eventLocation, budget, message } =
    req.body;

  const booking = await Booking.create({
    name,
    email,
    phone,
    eventType,
    eventDate: new Date(eventDate),
    eventLocation: eventLocation || '',
    budget,
    message: message || '',
    ipAddress: getClientIP(req),
  });

  res.status(201).json({
    success: true,
    message:
      'Booking request submitted! Our team will contact you within 12 hours to confirm availability.',
    data: {
      id: booking._id,
      name: booking.name,
      eventType: booking.eventType,
      eventDate: booking.formattedEventDate,
      status: booking.status,
      createdAt: booking.createdAt,
    },
  });
});

// ── GET /api/booking ──────────────────────────────────────────────────────────
// Protected (Admin): Get all bookings with pagination, sorting & filtering
const getAllBookings = asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = getPagination(req.query);

  // Build dynamic filter
  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.eventType) {
    filter.eventType = new RegExp(req.query.eventType, 'i');
  }
  if (req.query.search) {
    const regex = new RegExp(req.query.search, 'i');
    filter.$or = [{ name: regex }, { email: regex }, { phone: regex }];
  }
  if (req.query.startDate || req.query.endDate) {
    filter.eventDate = {};
    if (req.query.startDate) filter.eventDate.$gte = new Date(req.query.startDate);
    if (req.query.endDate) filter.eventDate.$lte = new Date(req.query.endDate);
  }

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(limit)
      .lean(),
    Booking.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    ...paginatedResponse({ data: bookings, total, page, limit }),
  });
});

// ── GET /api/booking/:id ──────────────────────────────────────────────────────
// Protected (Admin): Get a single booking by ID
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    const err = new Error('Booking not found');
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// ── PATCH /api/booking/:id/status ─────────────────────────────────────────────
// Protected (Admin): Update booking status
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    const err = new Error('Booking not found');
    err.statusCode = 404;
    throw err;
  }

  booking.status = status;
  if (adminNotes !== undefined) {
    booking.adminNotes = adminNotes;
  }
  await booking.save();

  res.status(200).json({
    success: true,
    message: `Booking status updated to '${status}'`,
    data: {
      id: booking._id,
      status: booking.status,
      adminNotes: booking.adminNotes,
    },
  });
});

// ── DELETE /api/booking/:id ───────────────────────────────────────────────────
// Protected (Admin): Permanently delete a booking
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    const err = new Error('Booking not found');
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({
    success: true,
    message: 'Booking deleted successfully.',
    data: { id: req.params.id },
  });
});

// ── GET /api/booking/stats ────────────────────────────────────────────────────
// Protected (Admin): Booking stats breakdown
const getBookingStats = asyncHandler(async (req, res) => {
  const [statusBreakdown, eventTypeBreakdown, monthlyTrend] = await Promise.all([
    // Bookings by status
    Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),

    // Bookings by event type
    Booking.aggregate([
      { $group: { _id: '$eventType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),

    // Bookings per month (last 12 months)
    Booking.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      statusBreakdown: statusBreakdown.map((s) => ({ status: s._id, count: s.count })),
      eventTypeBreakdown: eventTypeBreakdown.map((e) => ({
        eventType: e._id,
        count: e.count,
      })),
      monthlyTrend: monthlyTrend.map((m) => ({
        year: m._id.year,
        month: m._id.month,
        count: m.count,
      })),
    },
  });
});

module.exports = {
  submitBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getBookingStats,
};