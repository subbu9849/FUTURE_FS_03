// server.js
// Main entry point for Subbu Studio Backend API

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');

// Set DNS servers globally to Google DNS to resolve MongoDB SRV record query issues in libuv
dns.setServers(['8.8.8.8', '8.8.4.4']);

// ── Load environment variables first ─────────────────────────────────────────
dotenv.config();

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// ── Import routes ─────────────────────────────────────────────────────────────
const contactRoutes = require('./routes/contactRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

// ── Initialise Express app ────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB Atlas ──────────────────────────────────────────────────
connectDB();

// ── Parse allowed origins from env ───────────────────────────────────────────
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

// ── Global Middleware ─────────────────────────────────────────────────────────

// CORS – allow configured frontend origins
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Render health checks)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: Origin '${origin}' is not allowed.`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse JSON bodies (limit 10mb for any base64 image data in future)
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    service: 'Subbu Studio API',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ── API Root ──────────────────────────────────────────────────────────────────
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: '📸 Subbu Studio API is running',
    version: '1.0.0',
    endpoints: {
      contact: '/api/contact',
      booking: '/api/booking',
      admin: '/api/admin',
    },
    docs: 'See README.md for full API documentation',
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/admin', adminRoutes);

// ── 404 Handler (must be after all routes) ────────────────────────────────────
app.use(notFound);

// ── Global Error Handler (must be last) ──────────────────────────────────────
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║         📸  SUBBU STUDIO API SERVER          ║');
  console.log('╠══════════════════════════════════════════════╣');
  console.log(`║  Port        : ${PORT.toString().padEnd(30)}║`);
  console.log(`║  Environment : ${(process.env.NODE_ENV || 'development').padEnd(30)}║`);
  console.log(`║  Started at  : ${new Date().toLocaleTimeString('en-IN').padEnd(30)}║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
});

// ── Graceful shutdown on SIGTERM (Render/Docker) ──────────────────────────────
process.on('SIGTERM', () => {
  console.log('⚠️   SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅  HTTP server closed.');
    process.exit(0);
  });
});

// ── Unhandled promise rejections ──────────────────────────────────────────────
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔴 Unhandled Promise Rejection:', reason);
  server.close(() => process.exit(1));
});

// ── Uncaught exceptions ───────────────────────────────────────────────────────
process.on('uncaughtException', (error) => {
  console.error('🔴 Uncaught Exception:', error);
  process.exit(1);
});

module.exports = app; // for testing