// utils/helpers.js
// Shared utility functions used across controllers

// ── Pagination helper ─────────────────────────────────────────────────────────
/**
 * Parse and validate pagination query params.
 * @param {Object} query  req.query object
 * @param {number} defaultLimit  Default items per page (default: 10)
 * @returns {{ page, limit, skip, sort }}
 */
const getPagination = (query, defaultLimit = 10) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || defaultLimit));
  const skip = (page - 1) * limit;

  // sort: 'asc' or 'desc' (default: newest first)
  const sort = query.sort === 'asc' ? 1 : -1;

  return { page, limit, skip, sort };
};

// ── Build paginated response ──────────────────────────────────────────────────
/**
 * Returns a standard paginated API response shape.
 */
const paginatedResponse = ({ data, total, page, limit }) => {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

// ── Get client IP address ─────────────────────────────────────────────────────
const getClientIP = (req) => {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    'unknown'
  );
};

// ── Async error wrapper ───────────────────────────────────────────────────────
/**
 * Wraps an async route handler to catch errors and pass them to next().
 * Eliminates the need for try-catch in every controller.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ── Sanitize string input ─────────────────────────────────────────────────────
const sanitizeString = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

// ── Format Indian phone number ────────────────────────────────────────────────
const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  return phone;
};

module.exports = {
  getPagination,
  paginatedResponse,
  getClientIP,
  asyncHandler,
  sanitizeString,
  formatPhone,
};