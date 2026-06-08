// models/Booking.js
// Schema for photography/videography booking requests

const mongoose = require('mongoose');

const EVENT_TYPES = [
  'Wedding Photography',
  'Pre-Wedding Photography',
  'Engagement Photography',
  'Birthday Photography',
  'Baby Shoot',
  'Fashion Photography',
  'Product Photography',
  'Corporate Photography',
  'Event Photography',
  'Drone Photography',
  'Videography',
  'Album Designing',
  'Other',
];

const BUDGET_RANGES = [
  'Below ₹10,000',
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,00,000',
  'Above ₹2,00,000',
  'To be discussed',
];

const STATUS_TYPES = ['pending', 'confirmed', 'completed', 'cancelled'];

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[+]?[\d\s\-().]{7,20}$/,
        'Please provide a valid phone number',
      ],
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      enum: {
        values: EVENT_TYPES,
        message: '{VALUE} is not a supported event type',
      },
    },
    eventDate: {
      type: Date,
      required: [true, 'Event date is required'],
      validate: {
        validator: function (value) {
          // Event date must be in the future
          return value > new Date();
        },
        message: 'Event date must be a future date',
      },
    },
    eventLocation: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
      default: '',
    },
    budget: {
      type: String,
      required: [true, 'Budget range is required'],
      enum: {
        values: BUDGET_RANGES,
        message: '{VALUE} is not a valid budget range',
      },
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: STATUS_TYPES,
      default: 'pending',
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Admin notes cannot exceed 1000 characters'],
      default: '',
    },
    ipAddress: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: formatted event date
bookingSchema.virtual('formattedEventDate').get(function () {
  return this.eventDate
    ? this.eventDate.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;
});

// Indexes
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ eventDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ email: 1 });

// Export constants for use in controller/validator
bookingSchema.statics.EVENT_TYPES = EVENT_TYPES;
bookingSchema.statics.BUDGET_RANGES = BUDGET_RANGES;

module.exports = mongoose.model('Booking', bookingSchema);