// routes/adminRoutes.js

const express = require('express');
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getMe,
  changePassword,
  getDashboard,
  listAdmins,
  toggleAdminStatus,
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/authMiddleware');
const {
  validateAdminRegister,
  validateAdminLogin,
  validateObjectId,
} = require('../middleware/validationMiddleware');

// ── Public routes ─────────────────────────────────────────────────────────────

// POST /api/admin/login  →  Admin login
router.post('/login', validateAdminLogin, loginAdmin);

// ── Protected routes ──────────────────────────────────────────────────────────

// GET /api/admin/me  →  Get current admin profile
router.get('/me', protect, getMe);

// PUT /api/admin/me/password  →  Change own password
router.put('/me/password', protect, changePassword);

// GET /api/admin/dashboard  →  Full dashboard stats
router.get('/dashboard', protect, getDashboard);

// ── Superadmin-only routes ────────────────────────────────────────────────────

// POST /api/admin/register  →  Create new admin (superadmin only)
router.post(
  '/register',
  protect,
  authorize('superadmin'),
  validateAdminRegister,
  registerAdmin
);

// GET /api/admin/list  →  List all admins (superadmin only)
router.get('/list', protect, authorize('superadmin'), listAdmins);

// PATCH /api/admin/:id/toggle  →  Activate/deactivate admin (superadmin only)
router.patch(
  '/:id/toggle',
  protect,
  authorize('superadmin'),
  validateObjectId('id'),
  toggleAdminStatus
);

module.exports = router;