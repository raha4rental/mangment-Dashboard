const express = require('express');
const { body, validationResult } = require('express-validator');
const Owner = require('../models/Owner');
const Apartment = require('../models/Apartment');
const { authenticateToken, requireUserType } = require('../middleware/auth');

const router = express.Router();

// الحصول على معلومات المالك / Get owner information
router.get('/profile', authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const owner = await Owner.findById(req.user._id)
      .populate('ownedApartments.apartmentId', 'apartmentNumber buildingName address status')
      .select('-password');

    res.json({
      message: 'تم الحصول على معلومات المالك / Owner information retrieved',
      owner
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على معلومات المالك / Error retrieving owner information',
      error: error.message
    });
  }
});

// تحديث معلومات المالك / Update owner information
router.put('/profile', [
  body('firstName').optional().notEmpty().withMessage('الاسم الأول مطلوب / First name is required'),
  body('lastName').optional().notEmpty().withMessage('الاسم الأخير مطلوب / Last name is required'),
  body('phone').optional().notEmpty().withMessage('رقم الهاتف مطلوب / Phone number is required'),
  body('email').optional().isEmail().withMessage('البريد الإلكتروني غير صحيح / Invalid email')
], authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { firstName, lastName, phone, email, address, occupation, companyName, bankInfo } = req.body;
    
    // التحقق من البريد الإلكتروني إذا تم تغييره / Check email if changed
    if (email && email !== req.user.email) {
      const existingOwner = await Owner.findOne({ email });
      if (existingOwner) {
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
    if (companyName) updateData.companyName = companyName;
    if (bankInfo) updateData.bankInfo = bankInfo;

    const owner = await Owner.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'تم تحديث معلومات المالك / Owner information updated',
      owner
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تحديث معلومات المالك / Error updating owner information',
      error: error.message
    });
  }
});

// تغيير كلمة المرور / Change password
router.put('/change-password', [
  body('currentPassword').notEmpty().withMessage('كلمة المرور الحالية مطلوبة / Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل / New password must be at least 6 characters')
], authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    // الحصول على المالك مع كلمة المرور / Get owner with password
    const owner = await Owner.findById(req.user._id).select('+password');

    // التحقق من كلمة المرور الحالية / Verify current password
    const isCurrentPasswordValid = await owner.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message: 'كلمة المرور الحالية غير صحيحة / Current password is incorrect',
        error: 'INVALID_CURRENT_PASSWORD'
      });
    }

    // تحديث كلمة المرور / Update password
    owner.password = newPassword;
    await owner.save();

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

// الحصول على الشقق المملوكة / Get owned apartments
router.get('/apartments', authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const searchCriteria = { ownerId: req.user._id };
    if (status) {
      searchCriteria.status = status;
    }

    const apartments = await Apartment.find(searchCriteria)
      .populate('currentTenant.customerId', 'firstName lastName email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Apartment.countDocuments(searchCriteria);

    res.json({
      message: 'تم الحصول على الشقق المملوكة / Owned apartments retrieved',
      apartments,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على الشقق المملوكة / Error retrieving owned apartments',
      error: error.message
    });
  }
});

// الحصول على طلبات الإيجار / Get rental requests
router.get('/rental-requests', authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const { status = 'pending', page = 1, limit = 10 } = req.query;

    const apartments = await Apartment.find({ 
      ownerId: req.user._id,
      'rentalRequests.status': status
    })
    .populate('rentalRequests.customerId', 'firstName lastName email phone')
    .select('apartmentNumber buildingName address rentalRequests');

    const requests = [];
    apartments.forEach(apartment => {
      apartment.rentalRequests.forEach(request => {
        if (request.status === status) {
          requests.push({
            id: request._id,
            apartment: {
              id: apartment._id,
              number: apartment.apartmentNumber,
              building: apartment.buildingName,
              address: apartment.address
            },
            customer: request.customerId,
            startDate: request.startDate,
            endDate: request.endDate,
            message: request.message,
            status: request.status,
            requestedAt: request.requestedAt
          });
        }
      });
    });

    res.json({
      message: 'تم الحصول على طلبات الإيجار / Rental requests retrieved',
      requests
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على طلبات الإيجار / Error retrieving rental requests',
      error: error.message
    });
  }
});

// الموافقة على طلب إيجار / Approve rental request
router.put('/rental-requests/:requestId/approve', authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const { requestId } = req.params;
    const { startDate, endDate, rentAmount, depositAmount } = req.body;

    // البحث عن الشقة التي تحتوي على الطلب / Find apartment with the request
    const apartment = await Apartment.findOne({
      'rentalRequests._id': requestId,
      ownerId: req.user._id
    });

    if (!apartment) {
      return res.status(404).json({
        message: 'طلب الإيجار غير موجود / Rental request not found',
        error: 'REQUEST_NOT_FOUND'
      });
    }

    const request = apartment.rentalRequests.id(requestId);
    if (!request) {
      return res.status(404).json({
        message: 'طلب الإيجار غير موجود / Rental request not found',
        error: 'REQUEST_NOT_FOUND'
      });
    }

    // تحديث حالة الطلب / Update request status
    request.status = 'approved';
    request.approvedAt = new Date();

    // تحديث معلومات المستأجر الحالي / Update current tenant information
    apartment.currentTenant = {
      customerId: request.customerId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      rentAmount: rentAmount,
      depositAmount: depositAmount
    };

    // تحديث حالة الشقة / Update apartment status
    apartment.status = 'occupied';

    await apartment.save();

    res.json({
      message: 'تم الموافقة على طلب الإيجار / Rental request approved',
      request: {
        id: request._id,
        status: request.status,
        approvedAt: request.approvedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الموافقة على طلب الإيجار / Error approving rental request',
      error: error.message
    });
  }
});

// رفض طلب إيجار / Reject rental request
router.put('/rental-requests/:requestId/reject', authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const { requestId } = req.params;
    const { reason } = req.body;

    // البحث عن الشقة التي تحتوي على الطلب / Find apartment with the request
    const apartment = await Apartment.findOne({
      'rentalRequests._id': requestId,
      ownerId: req.user._id
    });

    if (!apartment) {
      return res.status(404).json({
        message: 'طلب الإيجار غير موجود / Rental request not found',
        error: 'REQUEST_NOT_FOUND'
      });
    }

    const request = apartment.rentalRequests.id(requestId);
    if (!request) {
      return res.status(404).json({
        message: 'طلب الإيجار غير موجود / Rental request not found',
        error: 'REQUEST_NOT_FOUND'
      });
    }

    // تحديث حالة الطلب / Update request status
    request.status = 'rejected';
    request.rejectedAt = new Date();
    request.rejectionReason = reason;

    await apartment.save();

    res.json({
      message: 'تم رفض طلب الإيجار / Rental request rejected',
      request: {
        id: request._id,
        status: request.status,
        rejectedAt: request.rejectedAt,
        rejectionReason: request.rejectionReason
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفض طلب الإيجار / Error rejecting rental request',
      error: error.message
    });
  }
});

// تحديث إعدادات الإشعارات / Update notification settings
router.put('/notification-settings', authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const { notificationSettings } = req.body;

    const owner = await Owner.findByIdAndUpdate(
      req.user._id,
      { notificationSettings },
      { new: true }
    ).select('-password');

    res.json({
      message: 'تم تحديث إعدادات الإشعارات / Notification settings updated',
      owner: {
        id: owner._id,
        notificationSettings: owner.notificationSettings
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تحديث إعدادات الإشعارات / Error updating notification settings',
      error: error.message
    });
  }
});

// الحصول على إحصائيات المالك / Get owner statistics
router.get('/statistics', authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const totalApartments = await Apartment.countDocuments({ ownerId: req.user._id });
    const availableApartments = await Apartment.countDocuments({ 
      ownerId: req.user._id, 
      status: 'available' 
    });
    const occupiedApartments = await Apartment.countDocuments({ 
      ownerId: req.user._id, 
      status: 'occupied' 
    });
    const maintenanceApartments = await Apartment.countDocuments({ 
      ownerId: req.user._id, 
      status: 'maintenance' 
    });

    // حساب إجمالي الإيجار الشهري / Calculate total monthly rent
    const apartments = await Apartment.find({ 
      ownerId: req.user._id, 
      status: 'occupied' 
    }).select('rentalInfo.monthlyRent');

    const totalMonthlyRent = apartments.reduce((total, apartment) => {
      return total + (apartment.rentalInfo.monthlyRent || 0);
    }, 0);

    res.json({
      message: 'تم الحصول على الإحصائيات / Statistics retrieved',
      statistics: {
        totalApartments,
        availableApartments,
        occupiedApartments,
        maintenanceApartments,
        totalMonthlyRent
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على الإحصائيات / Error retrieving statistics',
      error: error.message
    });
  }
});

module.exports = router;
