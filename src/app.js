require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const v1Routes = require('./routes');
const realisticRateLimit = require('./middleware/realisticRateLimit');
const deprecationNotice = require('./middleware/deprecationNotice');
const mockMiddleware = require('./middleware/mockMiddleware');

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting and error simulation (customizable for endpoints)
app.use(realisticRateLimit);

// Mock mode: returns canned responses if enabled
app.use(mockMiddleware);

// API version deprecation notice
app.use('/api/v1', deprecationNotice);

// Swagger/OpenAPI docs
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// File uploads and exports (static serving)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/exports', express.static(path.join(__dirname, '../exports')));

// Health and info endpoints
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/info', (req, res) => {
  res.json({
    version: '1.1.0',
    deprecatedVersions: ['v1'],
    supportedVersions: ['v2'],
    build: 'abcd123',
    time: new Date().toISOString()
  });
});

// Main API routes (all under /api/v1)
app.use('/api/v1', v1Routes);

module.exports = app;
