const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const Owner = require('../models/Owner');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// تسجيل دخول العملاء / Customer Login
router.post('/customer/login', [
  body('email').isEmail().withMessage('البريد الإلكتروني غير صحيح / Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل / Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // البحث عن العميل / Find customer
    const customer = await Customer.findOne({ email }).select('+password');
    if (!customer) {
      return res.status(401).json({
        message: 'بيانات الدخول غير صحيحة / Invalid credentials',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // التحقق من كلمة المرور / Verify password
    const isPasswordValid = await customer.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'بيانات الدخول غير صحيحة / Invalid credentials',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // التحقق من حالة الحساب / Check account status
    if (!customer.isActive) {
      return res.status(401).json({
        message: 'الحساب غير مفعل / Account is not active',
        error: 'ACCOUNT_INACTIVE'
      });
    }

    // إنشاء التوكن / Create token
    const token = jwt.sign(
      { 
        userId: customer._id, 
        userType: 'customer',
        email: customer.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'تم تسجيل الدخول بنجاح / Login successful',
      token,
      user: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        userType: 'customer'
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تسجيل الدخول / Login error',
      error: error.message
    });
  }
});

// تسجيل دخول الملاك / Owner Login
router.post('/owner/login', [
  body('email').isEmail().withMessage('البريد الإلكتروني غير صحيح / Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل / Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // البحث عن المالك / Find owner
    const owner = await Owner.findOne({ email }).select('+password');
    if (!owner) {
      return res.status(401).json({
        message: 'بيانات الدخول غير صحيحة / Invalid credentials',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // التحقق من كلمة المرور / Verify password
    const isPasswordValid = await owner.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'بيانات الدخول غير صحيحة / Invalid credentials',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // التحقق من حالة الحساب / Check account status
    if (!owner.isActive) {
      return res.status(401).json({
        message: 'الحساب غير مفعل / Account is not active',
        error: 'ACCOUNT_INACTIVE'
      });
    }

    // إنشاء التوكن / Create token
    const token = jwt.sign(
      { 
        userId: owner._id, 
        userType: 'owner',
        email: owner.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'تم تسجيل الدخول بنجاح / Login successful',
      token,
      user: {
        id: owner._id,
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        phone: owner.phone,
        userType: 'owner'
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تسجيل الدخول / Login error',
      error: error.message
    });
  }
});

// تسجيل عميل جديد / Register new customer
router.post('/customer/register', [
  body('firstName').notEmpty().withMessage('الاسم الأول مطلوب / First name is required'),
  body('lastName').notEmpty().withMessage('الاسم الأخير مطلوب / Last name is required'),
  body('email').isEmail().withMessage('البريد الإلكتروني غير صحيح / Invalid email'),
  body('phone').notEmpty().withMessage('رقم الهاتف مطلوب / Phone number is required'),
  body('nationalId').notEmpty().withMessage('رقم الهوية مطلوب / National ID is required'),
  body('password').isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل / Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, phone, nationalId, password, dateOfBirth, occupation } = req.body;

    // التحقق من وجود العميل / Check if customer exists
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { nationalId }]
    });

    if (existingCustomer) {
      return res.status(400).json({
        message: 'العميل موجود بالفعل / Customer already exists',
        error: 'CUSTOMER_EXISTS'
      });
    }

    // إنشاء عميل جديد / Create new customer
    const customer = new Customer({
      firstName,
      lastName,
      email,
      phone,
      nationalId,
      password,
      dateOfBirth,
      occupation
    });

    await customer.save();

    // إنشاء التوكن / Create token
    const token = jwt.sign(
      { 
        userId: customer._id, 
        userType: 'customer',
        email: customer.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'تم إنشاء الحساب بنجاح / Account created successfully',
      token,
      user: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        userType: 'customer'
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في إنشاء الحساب / Account creation error',
      error: error.message
    });
  }
});

// تسجيل مالك جديد / Register new owner
router.post('/owner/register', [
  body('firstName').notEmpty().withMessage('الاسم الأول مطلوب / First name is required'),
  body('lastName').notEmpty().withMessage('الاسم الأخير مطلوب / Last name is required'),
  body('email').isEmail().withMessage('البريد الإلكتروني غير صحيح / Invalid email'),
  body('phone').notEmpty().withMessage('رقم الهاتف مطلوب / Phone number is required'),
  body('nationalId').notEmpty().withMessage('رقم الهوية مطلوب / National ID is required'),
  body('password').isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل / Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, phone, nationalId, password, dateOfBirth, occupation, companyName } = req.body;

    // التحقق من وجود المالك / Check if owner exists
    const existingOwner = await Owner.findOne({
      $or: [{ email }, { nationalId }]
    });

    if (existingOwner) {
      return res.status(400).json({
        message: 'المالك موجود بالفعل / Owner already exists',
        error: 'OWNER_EXISTS'
      });
    }

    // إنشاء مالك جديد / Create new owner
    const owner = new Owner({
      firstName,
      lastName,
      email,
      phone,
      nationalId,
      password,
      dateOfBirth,
      occupation,
      companyName
    });

    await owner.save();

    // إنشاء التوكن / Create token
    const token = jwt.sign(
      { 
        userId: owner._id, 
        userType: 'owner',
        email: owner.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'تم إنشاء الحساب بنجاح / Account created successfully',
      token,
      user: {
        id: owner._id,
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        phone: owner.phone,
        userType: 'owner'
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في إنشاء الحساب / Account creation error',
      error: error.message
    });
  }
});

// التحقق من التوكن / Verify token
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    message: 'التوكن صحيح / Token is valid',
    user: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      userType: req.userType
    }
  });
});

// تسجيل الخروج / Logout
router.post('/logout', authenticateToken, (req, res) => {
  // في التطبيق الحقيقي، يمكن إضافة التوكن إلى قائمة سوداء
  // In a real application, you can add the token to a blacklist
  res.json({
    message: 'تم تسجيل الخروج بنجاح / Logout successful'
  });
});

module.exports = router;
