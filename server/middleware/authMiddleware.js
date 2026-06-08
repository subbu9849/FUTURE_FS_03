// middleware/authMiddleware.js
// JWT-based authentication and role-based authorization middleware

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// ── Protect route: verify JWT token ──────────────────────────────────────────
const protect = async (req, res, next) => {
  let token;

  // Accept token from Authorization header (Bearer <token>) or cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided. Please log in.',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch admin from database (exclude password)
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Token is valid but the admin account no longer exists.',
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated. Contact the superadmin.',
      });
    }

    if (admin.isLocked) {
      return res.status(403).json({
        success: false,
        message:
          'Account is temporarily locked due to too many failed login attempts.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.',
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again.',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Authentication error. Please try again.',
    });
  }
};

// ── Authorize roles ───────────────────────────────────────────────────────────
// Usage: authorize('superadmin', 'admin')
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated. Please log in.',
      });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.admin.role}' is not permitted for this action.`,
      });
    }

    next();
  };
};

// ── Generate JWT token ────────────────────────────────────────────────────────
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

module.exports = { protect, authorize, generateToken };