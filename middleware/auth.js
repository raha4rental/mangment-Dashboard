const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Owner = require('../models/Owner');

// التحقق من التوكن / Verify token middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        message: 'التوكن مطلوب / Token is required',
        error: 'UNAUTHORIZED'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // البحث عن المستخدم / Find user
    let user = await Customer.findById(decoded.userId);
    let userType = 'customer';
    
    if (!user) {
      user = await Owner.findById(decoded.userId);
      userType = 'owner';
    }
    
    if (!user) {
      return res.status(401).json({
        message: 'المستخدم غير موجود / User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        message: 'الحساب غير مفعل / Account is not active',
        error: 'ACCOUNT_INACTIVE'
      });
    }

    req.user = user;
    req.userType = userType;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'توكن غير صحيح / Invalid token',
        error: 'INVALID_TOKEN'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'انتهت صلاحية التوكن / Token expired',
        error: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(500).json({
      message: 'خطأ في التحقق من التوكن / Token verification error',
      error: error.message
    });
  }
};

// التحقق من نوع المستخدم / Check user type middleware
const requireUserType = (userType) => {
  return (req, res, next) => {
    if (req.userType !== userType) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول / Access denied',
        error: 'INSUFFICIENT_PERMISSIONS'
      });
    }
    next();
  };
};

// التحقق من أن المستخدم هو مالك الشقة / Check if user is apartment owner
const requireApartmentOwner = async (req, res, next) => {
  try {
    const { apartmentId } = req.params;
    const Apartment = require('../models/Apartment');
    
    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({
        message: 'الشقة غير موجودة / Apartment not found',
        error: 'APARTMENT_NOT_FOUND'
      });
    }
    
    if (apartment.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول لهذه الشقة / Access denied to this apartment',
        error: 'NOT_APARTMENT_OWNER'
      });
    }
    
    req.apartment = apartment;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'خطأ في التحقق من ملكية الشقة / Error checking apartment ownership',
      error: error.message
    });
  }
};

// التحقق من أن المستخدم هو مستأجر الشقة / Check if user is apartment tenant
const requireApartmentTenant = async (req, res, next) => {
  try {
    const { apartmentId } = req.params;
    const Apartment = require('../models/Apartment');
    
    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({
        message: 'الشقة غير موجودة / Apartment not found',
        error: 'APARTMENT_NOT_FOUND'
      });
    }
    
    if (apartment.currentTenant.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول لهذه الشقة / Access denied to this apartment',
        error: 'NOT_APARTMENT_TENANT'
      });
    }
    
    req.apartment = apartment;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'خطأ في التحقق من إيجار الشقة / Error checking apartment tenancy',
      error: error.message
    });
  }
};

module.exports = {
  authenticateToken,
  requireUserType,
  requireApartmentOwner,
  requireApartmentTenant
};
