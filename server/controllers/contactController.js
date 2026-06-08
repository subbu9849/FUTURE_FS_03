// controllers/contactController.js
// Business logic for contact form submissions

const Contact = require('../models/Contact');
const { asyncHandler, getPagination, paginatedResponse, getClientIP } = require('../utils/helpers');

// ── POST /api/contact ─────────────────────────────────────────────────────────
// Public: Submit a new contact/inquiry
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
    ipAddress: getClientIP(req),
  });

  res.status(201).json({
    success: true,
    message:
      'Thank you for reaching out! We will get back to you within 24 hours.',
    data: {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      createdAt: contact.createdAt,
    },
  });
});

// ── GET /api/contact ──────────────────────────────────────────────────────────
// Protected (Admin): Get all contact submissions with pagination & filtering
const getAllContacts = asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = getPagination(req.query);

  // Optional filters
  const filter = {};
  if (req.query.isRead !== undefined) {
    filter.isRead = req.query.isRead === 'true';
  }
  if (req.query.search) {
    const regex = new RegExp(req.query.search, 'i');
    filter.$or = [{ name: regex }, { email: regex }, { phone: regex }];
  }

  const [contacts, total] = await Promise.all([
    Contact.find(filter)
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(limit)
      .lean(),
    Contact.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    ...paginatedResponse({ data: contacts, total, page, limit }),
  });
});

// ── GET /api/contact/:id ──────────────────────────────────────────────────────
// Protected (Admin): Get a single contact by ID
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    const err = new Error('Contact not found');
    err.statusCode = 404;
    throw err;
  }

  // Auto-mark as read when admin opens it
  if (!contact.isRead) {
    contact.isRead = true;
    await contact.save();
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// ── PATCH /api/contact/:id/read ───────────────────────────────────────────────
// Protected (Admin): Toggle read/unread status
const markContactRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    const err = new Error('Contact not found');
    err.statusCode = 404;
    throw err;
  }

  contact.isRead = !contact.isRead;
  await contact.save();

  res.status(200).json({
    success: true,
    message: `Contact marked as ${contact.isRead ? 'read' : 'unread'}`,
    data: { id: contact._id, isRead: contact.isRead },
  });
});

// ── DELETE /api/contact/:id ───────────────────────────────────────────────────
// Protected (Admin): Permanently delete a contact
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    const err = new Error('Contact not found');
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({
    success: true,
    message: 'Contact deleted successfully.',
    data: { id: req.params.id },
  });
});

// ── DELETE /api/contact ───────────────────────────────────────────────────────
// Protected (Superadmin): Delete all contacts (bulk clear)
const deleteAllContacts = asyncHandler(async (req, res) => {
  const result = await Contact.deleteMany({});

  res.status(200).json({
    success: true,
    message: `Deleted ${result.deletedCount} contacts.`,
  });
});

module.exports = {
  submitContact,
  getAllContacts,
  getContactById,
  markContactRead,
  deleteContact,
  deleteAllContacts,
};