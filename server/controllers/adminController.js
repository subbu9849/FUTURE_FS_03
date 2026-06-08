// controllers/adminController.js
// Admin authentication and dashboard analytics

const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const Booking = require('../models/Booking');
const { generateToken } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../utils/helpers');

// ── POST /api/admin/register ──────────────────────────────────────────────────
// Protected (Superadmin only): Create a new admin user
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if email already exists
  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    const err = new Error('An admin with this email already exists.');
    err.statusCode = 409;
    throw err;
  }

  // Only superadmins can create other superadmins
  if (role === 'superadmin' && req.admin?.role !== 'superadmin') {
    const err = new Error('Only superadmins can create superadmin accounts.');
    err.statusCode = 403;
    throw err;
  }

  const admin = await Admin.create({ name, email, password, role });

  res.status(201).json({
    success: true,
    message: `Admin account created for ${admin.name}.`,
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
    },
  });
});

// ── POST /api/admin/login ─────────────────────────────────────────────────────
// Public: Admin login with JWT issuance
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Fetch admin (include password field explicitly since it's select: false)
  const admin = await Admin.findOne({ email: email.toLowerCase() }).select(
    '+password +loginAttempts +lockUntil'
  );

  // Generic message to prevent user enumeration
  const invalidMsg = 'Invalid email or password. Please try again.';

  if (!admin) {
    return res.status(401).json({ success: false, message: invalidMsg });
  }

  // Check if account is locked
  if (admin.isLocked) {
    const unlockTime = new Date(admin.lockUntil);
    return res.status(403).json({
      success: false,
      message: `Account locked due to too many failed attempts. Try again after ${unlockTime.toLocaleTimeString('en-IN')}.`,
    });
  }

  // Check if account is active
  if (!admin.isActive) {
    return res.status(403).json({
      success: false,
      message: 'Your account has been deactivated. Contact the superadmin.',
    });
  }

  // Compare password
  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    // Increment failed attempts
    await admin.incLoginAttempts();
    return res.status(401).json({ success: false, message: invalidMsg });
  }

  // Successful login: reset login attempts and update lastLogin
  await Admin.findByIdAndUpdate(admin._id, {
    $set: { lastLogin: new Date(), loginAttempts: 0 },
    $unset: { lockUntil: 1 },
  });

  // Generate JWT
  const token = generateToken(admin._id);

  res.status(200).json({
    success: true,
    message: `Welcome back, ${admin.name}!`,
    token,
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      lastLogin: admin.lastLogin,
    },
  });
});

// ── GET /api/admin/me ─────────────────────────────────────────────────────────
// Protected: Get currently logged-in admin's profile
const getMe = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    const err = new Error('Admin not found');
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({
    success: true,
    data: admin,
  });
});

// ── PUT /api/admin/me/password ────────────────────────────────────────────────
// Protected: Change own password
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Both currentPassword and newPassword are required.',
    });
  }

  if (newPassword.length < 8) {
    return res.status(422).json({
      success: false,
      message: 'New password must be at least 8 characters.',
    });
  }

  const admin = await Admin.findById(req.admin._id).select('+password');

  const isMatch = await admin.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect.',
    });
  }

  admin.password = newPassword; // pre-save hook will hash it
  await admin.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully. Please log in again with your new password.',
  });
});

// ── GET /api/admin/dashboard ──────────────────────────────────────────────────
// Protected: Aggregated dashboard statistics
const getDashboard = asyncHandler(async (req, res) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Run all queries in parallel for performance
  const [
    totalContacts,
    totalBookings,
    unreadContacts,
    pendingBookings,
    confirmedBookings,
    newContactsLast30,
    newBookingsLast30,
    recentContacts,
    recentBookings,
    upcomingBookings,
    bookingsByStatus,
    bookingsByEventType,
  ] = await Promise.all([
    Contact.countDocuments(),
    Booking.countDocuments(),
    Contact.countDocuments({ isRead: false }),
    Booking.countDocuments({ status: 'pending' }),
    Booking.countDocuments({ status: 'confirmed' }),
    Contact.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    Booking.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),

    // 5 most recent contacts
    Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email phone message isRead createdAt')
      .lean(),

    // 5 most recent bookings
    Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email phone eventType eventDate budget status createdAt')
      .lean(),

    // Bookings with events in the next 30 days
    Booking.find({
      eventDate: { $gte: now, $lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) },
      status: { $in: ['pending', 'confirmed'] },
    })
      .sort({ eventDate: 1 })
      .limit(10)
      .select('name email phone eventType eventDate status')
      .lean(),

    // Bookings grouped by status
    Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),

    // Top 5 event types
    Booking.aggregate([
      { $group: { _id: '$eventType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      overview: {
        totalContacts,
        totalBookings,
        unreadContacts,
        pendingBookings,
        confirmedBookings,
        newContactsLast30Days: newContactsLast30,
        newBookingsLast30Days: newBookingsLast30,
      },
      recentContacts,
      recentBookings,
      upcomingBookings,
      charts: {
        bookingsByStatus: bookingsByStatus.map((b) => ({
          status: b._id,
          count: b.count,
        })),
        topEventTypes: bookingsByEventType.map((e) => ({
          eventType: e._id,
          count: e.count,
        })),
      },
      generatedAt: new Date().toISOString(),
    },
  });
});

// ── GET /api/admin/list ───────────────────────────────────────────────────────
// Protected (Superadmin): List all admin accounts
const listAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().sort({ createdAt: -1 }).lean();

  res.status(200).json({
    success: true,
    count: admins.length,
    data: admins,
  });
});

// ── PATCH /api/admin/:id/toggle ───────────────────────────────────────────────
// Protected (Superadmin): Activate/deactivate an admin account
const toggleAdminStatus = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    const err = new Error('Admin not found');
    err.statusCode = 404;
    throw err;
  }

  // Prevent deactivating yourself
  if (admin._id.toString() === req.admin._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'You cannot deactivate your own account.',
    });
  }

  admin.isActive = !admin.isActive;
  await admin.save();

  res.status(200).json({
    success: true,
    message: `Admin account ${admin.isActive ? 'activated' : 'deactivated'}.`,
    data: { id: admin._id, isActive: admin.isActive },
  });
});

module.exports = {
  registerAdmin,
  loginAdmin,
  getMe,
  changePassword,
  getDashboard,
  listAdmins,
  toggleAdminStatus,
};