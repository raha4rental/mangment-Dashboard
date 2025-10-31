const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apartment_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('تم الاتصال بقاعدة البيانات بنجاح / Database connected successfully'))
.catch(err => console.error('خطأ في الاتصال بقاعدة البيانات / Database connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/apartments', require('./routes/apartments'));
app.use('/api/owners', require('./routes/owners'));
app.use('/api/handover', require('./routes/handover'));
app.use('/api/upload', require('./routes/upload'));

// Public handover route
app.get('/api/handovers', async (req, res) => {
  try {
    const Handover = require('./models/Handover');
    const handovers = await Handover.find()
      .populate('apartmentId', 'apartmentNumber buildingName address')
      .populate('tenantId', 'firstName lastName email phone')
      .populate('ownerId', 'firstName lastName email phone')
      .sort({ handoverDate: -1 });

    res.json({
      message: 'تم الحصول على التسليمات / Handovers retrieved',
      handovers
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على التسليمات / Error retrieving handovers',
      error: error.message
    });
  }
});

// Basic route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API info route
app.get('/api', (req, res) => {
  res.json({
    message: 'RahaTeam API - نظام إدارة الممتلكات / Property Management System',
    version: '1.0.0',
    domain: 'rahateam.com',
    endpoints: {
      auth: '/api/auth',
      customers: '/api/customers',
      apartments: '/api/apartments',
      owners: '/api/owners',
      handover: '/api/handover'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'خطأ في الخادم / Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'خطأ داخلي في الخادم'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'الصفحة غير موجودة / Page not found'
  });
});

app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT} / Server running on port ${PORT}`);
});
