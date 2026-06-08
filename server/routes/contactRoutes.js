// routes/contactRoutes.js

const express = require('express');
const router = express.Router();

const {
  submitContact,
  getAllContacts,
  getContactById,
  markContactRead,
  deleteContact,
  deleteAllContacts,
} = require('../controllers/contactController');

const { protect, authorize } = require('../middleware/authMiddleware');
const {
  validateContact,
  validateObjectId,
} = require('../middleware/validationMiddleware');

// ── Public routes ─────────────────────────────────────────────────────────────

// POST /api/contact  →  Submit contact form
router.post('/', validateContact, submitContact);

// ── Protected routes (admin only) ────────────────────────────────────────────

// GET /api/contact  →  Get all contacts (with pagination & filtering)
router.get('/', protect, getAllContacts);

// DELETE /api/contact  →  Delete all contacts (superadmin only)
router.delete('/', protect, authorize('superadmin'), deleteAllContacts);

// GET /api/contact/:id  →  Get single contact
router.get('/:id', protect, validateObjectId('id'), getContactById);

// PATCH /api/contact/:id/read  →  Toggle read status
router.patch('/:id/read', protect, validateObjectId('id'), markContactRead);

// DELETE /api/contact/:id  →  Delete single contact
router.delete('/:id', protect, validateObjectId('id'), deleteContact);

module.exports = router;