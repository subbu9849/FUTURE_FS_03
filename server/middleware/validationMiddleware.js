// middleware/validationMiddleware.js
// express-validator rule sets for all API routes

const { body, param, validationResult } = require('express-validator');
const Booking = require('../models/Booking');

// ── Helper: run validation and return errors ──────────────────────────────────
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed. Please check your input.',
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
        value: e.value,
      })),
    });
  }
  next();
};

// ── Shared field validators ───────────────────────────────────────────────────
const nameValidator = body('name')
  .trim()
  .notEmpty().withMessage('Name is required')
  .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
  .matches(/^[a-zA-Z\s.'-]+$/).withMessage('Name can only contain letters, spaces, and basic punctuation');

const emailValidator = body('email')
  .trim()
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Please provide a valid email address')
  .normalizeEmail()
  .isLength({ max: 254 }).withMessage('Email address is too long');

const phoneValidator = body('phone')
  .trim()
  .notEmpty().withMessage('Phone number is required')
  .matches(/^[+]?[\d\s\-().]{7,20}$/).withMessage('Please provide a valid phone number (7-20 digits)');

const messageValidator = (required = true) => {
  const v = body('message').trim();
  if (required) v.notEmpty().withMessage('Message is required');
  return v.isLength({ min: required ? 10 : 0, max: 2000 })
    .withMessage(`Message must be between ${required ? 10 : 0} and 2000 characters`);
};

// ── Contact form validation ───────────────────────────────────────────────────
const validateContact = [
  nameValidator,
  emailValidator,
  phoneValidator,
  messageValidator(true),
  validate,
];

// ── Booking form validation ───────────────────────────────────────────────────
const validateBooking = [
  nameValidator,
  emailValidator,
  phoneValidator,

  body('eventType')
    .trim()
    .notEmpty().withMessage('Event type is required')
    .isIn(Booking.schema.statics
      ? ['Wedding Photography','Pre-Wedding Photography','Engagement Photography','Birthday Photography','Baby Shoot','Fashion Photography','Product Photography','Corporate Photography','Event Photography','Drone Photography','Videography','Album Designing','Other']
      : ['Other'])
    .withMessage('Please select a valid event type'),

  body('eventDate')
    .notEmpty().withMessage('Event date is required')
    .isISO8601().withMessage('Please provide a valid date (YYYY-MM-DD)')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        throw new Error('Event date must be today or a future date');
      }
      return true;
    }),

  body('eventLocation')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Location cannot exceed 200 characters'),

  body('budget')
    .trim()
    .notEmpty().withMessage('Budget range is required')
    .isIn([
      'Below ₹10,000',
      '₹10,000 - ₹25,000',
      '₹25,000 - ₹50,000',
      '₹50,000 - ₹1,00,000',
      '₹1,00,000 - ₹2,00,000',
      'Above ₹2,00,000',
      'To be discussed',
    ])
    .withMessage('Please select a valid budget range'),

  messageValidator(false),
  validate,
];

// ── Admin registration validation ─────────────────────────────────────────────
const validateAdminRegister = [
  nameValidator,
  emailValidator,

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character (@$!%*?&)'),

  body('role')
    .optional()
    .isIn(['superadmin', 'admin', 'staff'])
    .withMessage('Role must be superadmin, admin, or staff'),

  validate,
];

// ── Admin login validation ────────────────────────────────────────────────────
const validateAdminLogin = [
  emailValidator,

  body('password')
    .notEmpty().withMessage('Password is required'),

  validate,
];

// ── Validate MongoDB ObjectId param ──────────────────────────────────────────
const validateObjectId = (paramName = 'id') => [
  param(paramName)
    .isMongoId().withMessage(`Invalid ${paramName} format. Must be a valid MongoDB ObjectId.`),
  validate,
];

// ── Validate booking status update ───────────────────────────────────────────
const validateStatusUpdate = [
  body('status')
    .trim()
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Status must be one of: pending, confirmed, completed, cancelled'),
  validate,
];

module.exports = {
  validate,
  validateContact,
  validateBooking,
  validateAdminRegister,
  validateAdminLogin,
  validateObjectId,
  validateStatusUpdate,
};
