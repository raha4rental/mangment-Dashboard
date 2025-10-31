const express = require('express');
const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const Apartment = require('../models/Apartment');
const { authenticateToken, requireUserType } = require('../middleware/auth');

const router = express.Router();

// الحصول على جميع العملاء (للعرض العام) / Get all customers (for public display)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const customers = await Customer.find({ isActive: true })
      .select('-password -idPhotos -rentedApartments')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Customer.countDocuments({ isActive: true });

    res.json({
      message: 'تم الحصول على العملاء / Customers retrieved',
      customers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على العملاء / Error retrieving customers',
      error: error.message
    });
  }
});

// الحصول على معلومات العميل / Get customer information
router.get('/profile', authenticateToken, requireUserType('customer'), async (req, res) => {
  try {
    const customer = await Customer.findById(req.user._id)
      .populate('rentedApartments.apartmentId', 'apartmentNumber buildingName address specifications')
      .select('-password');

    res.json({
      message: 'تم الحصول على معلومات العميل / Customer information retrieved',
      customer
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على معلومات العميل / Error retrieving customer information',
      error: error.message
    });
  }
});

// تحديث معلومات العميل / Update customer information
router.put('/profile', [
  body('firstName').optional().notEmpty().withMessage('الاسم الأول مطلوب / First name is required'),
  body('lastName').optional().notEmpty().withMessage('الاسم الأخير مطلوب / Last name is required'),
  body('phone').optional().notEmpty().withMessage('رقم الهاتف مطلوب / Phone number is required'),
  body('email').optional().isEmail().withMessage('البريد الإلكتروني غير صحيح / Invalid email')
], authenticateToken, requireUserType('customer'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { firstName, lastName, phone, email, address, occupation, emergencyContact } = req.body;
    
    // التحقق من البريد الإلكتروني إذا تم تغييره / Check email if changed
    if (email && email !== req.user.email) {
      const existingCustomer = await Customer.findOne({ email });
      if (existingCustomer) {
        return res.status(400).json({
          message: 'البريد الإلكتروني مستخدم بالفعل / Email already in use',
          error: 'EMAIL_EXISTS'
        });
      }
    }

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    if (address) updateData.address = address;
    if (occupation) updateData.occupation = occupation;
    if (emergencyContact) updateData.emergencyContact = emergencyContact;

    const customer = await Customer.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'تم تحديث معلومات العميل / Customer information updated',
      customer
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تحديث معلومات العميل / Error updating customer information',
      error: error.message
    });
  }
});

// تغيير كلمة المرور / Change password
router.put('/change-password', [
  body('currentPassword').notEmpty().withMessage('كلمة المرور الحالية مطلوبة / Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل / New password must be at least 6 characters')
], authenticateToken, requireUserType('customer'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    // الحصول على العميل مع كلمة المرور / Get customer with password
    const customer = await Customer.findById(req.user._id).select('+password');

    // التحقق من كلمة المرور الحالية / Verify current password
    const isCurrentPasswordValid = await customer.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message: 'كلمة المرور الحالية غير صحيحة / Current password is incorrect',
        error: 'INVALID_CURRENT_PASSWORD'
      });
    }

    // تحديث كلمة المرور / Update password
    customer.password = newPassword;
    await customer.save();

    res.json({
      message: 'تم تغيير كلمة المرور بنجاح / Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تغيير كلمة المرور / Error changing password',
      error: error.message
    });
  }
});

// رفع صور الهوية / Upload ID photos
router.post('/upload-id-photos', authenticateToken, requireUserType('customer'), async (req, res) => {
  try {
    const { frontPhoto, backPhoto } = req.body;

    if (!frontPhoto || !backPhoto) {
      return res.status(400).json({
        message: 'صور الهوية مطلوبة / ID photos are required',
        error: 'MISSING_PHOTOS'
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          idPhotos: {
            front: frontPhoto,
            back: backPhoto
          }
        }
      },
      { new: true }
    ).select('-password');

    res.json({
      message: 'تم رفع صور الهوية بنجاح / ID photos uploaded successfully',
      customer
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع صور الهوية / Error uploading ID photos',
      error: error.message
    });
  }
});

// الحصول على الشقق المستأجرة / Get rented apartments
router.get('/apartments', authenticateToken, requireUserType('customer'), async (req, res) => {
  try {
    const customer = await Customer.findById(req.user._id)
      .populate({
        path: 'rentedApartments.apartmentId',
        populate: {
          path: 'ownerId',
          select: 'firstName lastName email phone'
        }
      })
      .select('rentedApartments');

    res.json({
      message: 'تم الحصول على الشقق المستأجرة / Rented apartments retrieved',
      apartments: customer.rentedApartments
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على الشقق المستأجرة / Error retrieving rented apartments',
      error: error.message
    });
  }
});

// البحث عن شقق متاحة / Search available apartments
router.get('/search-apartments', authenticateToken, requireUserType('customer'), async (req, res) => {
  try {
    const { city, minRent, maxRent, bedrooms, bathrooms } = req.query;

    const searchCriteria = {
      status: 'available'
    };

    if (city) {
      searchCriteria['address.city'] = new RegExp(city, 'i');
    }

    if (minRent || maxRent) {
      searchCriteria['rentalInfo.monthlyRent'] = {};
      if (minRent) searchCriteria['rentalInfo.monthlyRent'].$gte = parseInt(minRent);
      if (maxRent) searchCriteria['rentalInfo.monthlyRent'].$lte = parseInt(maxRent);
    }

    if (bedrooms) {
      searchCriteria['specifications.bedrooms'] = parseInt(bedrooms);
    }

    if (bathrooms) {
      searchCriteria['specifications.bathrooms'] = parseInt(bathrooms);
    }

    const apartments = await Apartment.find(searchCriteria)
      .populate('ownerId', 'firstName lastName email phone')
      .select('-furniture -appliances -photos');

    res.json({
      message: 'تم البحث عن الشقق / Apartment search completed',
      apartments
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في البحث عن الشقق / Error searching apartments',
      error: error.message
    });
  }
});

// طلب استئجار شقة / Request apartment rental
router.post('/request-rental/:apartmentId', authenticateToken, requireUserType('customer'), async (req, res) => {
  try {
    const { apartmentId } = req.params;
    const { startDate, endDate, message } = req.body;

    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({
        message: 'الشقة غير موجودة / Apartment not found',
        error: 'APARTMENT_NOT_FOUND'
      });
    }

    if (apartment.status !== 'available') {
      return res.status(400).json({
        message: 'الشقة غير متاحة للإيجار / Apartment is not available for rent',
        error: 'APARTMENT_NOT_AVAILABLE'
      });
    }

    // إضافة طلب الإيجار إلى الشقة / Add rental request to apartment
    if (!apartment.rentalRequests) {
      apartment.rentalRequests = [];
    }

    apartment.rentalRequests.push({
      customerId: req.user._id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      message: message,
      status: 'pending',
      requestedAt: new Date()
    });

    await apartment.save();

    res.json({
      message: 'تم إرسال طلب الإيجار بنجاح / Rental request sent successfully',
      request: {
        apartmentId: apartment._id,
        customerId: req.user._id,
        startDate,
        endDate,
        status: 'pending'
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في إرسال طلب الإيجار / Error sending rental request',
      error: error.message
    });
  }
});

// حذف الحساب / Delete account
router.delete('/account', authenticateToken, requireUserType('customer'), async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: 'كلمة المرور مطلوبة لحذف الحساب / Password is required to delete account',
        error: 'PASSWORD_REQUIRED'
      });
    }

    const customer = await Customer.findById(req.user._id).select('+password');
    const isPasswordValid = await customer.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'كلمة المرور غير صحيحة / Password is incorrect',
        error: 'INVALID_PASSWORD'
      });
    }

    // تعطيل الحساب بدلاً من حذفه / Deactivate account instead of deleting
    customer.isActive = false;
    await customer.save();

    res.json({
      message: 'تم حذف الحساب بنجاح / Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في حذف الحساب / Error deleting account',
      error: error.message
    });
  }
});

module.exports = router;
