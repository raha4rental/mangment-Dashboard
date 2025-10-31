const express = require('express');
const { body, validationResult } = require('express-validator');
const Apartment = require('../models/Apartment');
const { authenticateToken, requireUserType, requireApartmentOwner } = require('../middleware/auth');

const router = express.Router();

// الحصول على جميع الشقق / Get all apartments
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, city, status, minRent, maxRent } = req.query;
    
    const searchCriteria = {};
    
    if (city) {
      searchCriteria['address.city'] = new RegExp(city, 'i');
    }
    
    if (status) {
      searchCriteria.status = status;
    }
    
    if (minRent || maxRent) {
      searchCriteria['rentalInfo.monthlyRent'] = {};
      if (minRent) searchCriteria['rentalInfo.monthlyRent'].$gte = parseInt(minRent);
      if (maxRent) searchCriteria['rentalInfo.monthlyRent'].$lte = parseInt(maxRent);
    }

    const apartments = await Apartment.find(searchCriteria)
      .populate('ownerId', 'firstName lastName email phone')
      .populate('currentTenant.customerId', 'firstName lastName email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Apartment.countDocuments(searchCriteria);

    res.json({
      message: 'تم الحصول على الشقق / Apartments retrieved',
      apartments,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على الشقق / Error retrieving apartments',
      error: error.message
    });
  }
});

// الحصول على شقة واحدة / Get single apartment
router.get('/:id', async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id)
      .populate('ownerId', 'firstName lastName email phone')
      .populate('currentTenant.customerId', 'firstName lastName email phone');

    if (!apartment) {
      return res.status(404).json({
        message: 'الشقة غير موجودة / Apartment not found',
        error: 'APARTMENT_NOT_FOUND'
      });
    }

    res.json({
      message: 'تم الحصول على الشقة / Apartment retrieved',
      apartment
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على الشقة / Error retrieving apartment',
      error: error.message
    });
  }
});

// إنشاء شقة جديدة / Create new apartment
router.post('/', [
  body('apartmentNumber').notEmpty().withMessage('رقم الشقة مطلوب / Apartment number is required'),
  body('buildingName').notEmpty().withMessage('اسم المبنى مطلوب / Building name is required'),
  body('address.street').notEmpty().withMessage('اسم الشارع مطلوب / Street name is required'),
  body('address.city').notEmpty().withMessage('المدينة مطلوبة / City is required'),
  body('address.state').notEmpty().withMessage('المحافظة مطلوبة / State is required'),
  body('specifications.bedrooms').isNumeric().withMessage('عدد الغرف يجب أن يكون رقماً / Number of bedrooms must be numeric'),
  body('specifications.bathrooms').isNumeric().withMessage('عدد الحمامات يجب أن يكون رقماً / Number of bathrooms must be numeric'),
  body('specifications.area').isNumeric().withMessage('المساحة يجب أن تكون رقماً / Area must be numeric'),
  body('specifications.floor').isNumeric().withMessage('الطابق يجب أن يكون رقماً / Floor must be numeric'),
  body('rentalInfo.monthlyRent').isNumeric().withMessage('الإيجار الشهري يجب أن يكون رقماً / Monthly rent must be numeric'),
  body('rentalInfo.deposit').isNumeric().withMessage('الضمان يجب أن يكون رقماً / Deposit must be numeric')
], authenticateToken, requireUserType('owner'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const apartmentData = {
      ...req.body,
      ownerId: req.user._id
    };

    const apartment = new Apartment(apartmentData);
    await apartment.save();

    // تحديث معلومات المالك / Update owner information
    const Owner = require('../models/Owner');
    await Owner.findByIdAndUpdate(req.user._id, {
      $push: { ownedApartments: { apartmentId: apartment._id } }
    });

    res.status(201).json({
      message: 'تم إنشاء الشقة بنجاح / Apartment created successfully',
      apartment
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'رقم الشقة مستخدم بالفعل / Apartment number already exists',
        error: 'DUPLICATE_APARTMENT_NUMBER'
      });
    }
    
    res.status(500).json({
      message: 'خطأ في إنشاء الشقة / Error creating apartment',
      error: error.message
    });
  }
});

// تحديث شقة / Update apartment
router.put('/:id', [
  body('apartmentNumber').optional().notEmpty().withMessage('رقم الشقة مطلوب / Apartment number is required'),
  body('buildingName').optional().notEmpty().withMessage('اسم المبنى مطلوب / Building name is required'),
  body('address.street').optional().notEmpty().withMessage('اسم الشارع مطلوب / Street name is required'),
  body('address.city').optional().notEmpty().withMessage('المدينة مطلوبة / City is required'),
  body('address.state').optional().notEmpty().withMessage('المحافظة مطلوبة / State is required')
], authenticateToken, requireUserType('owner'), requireApartmentOwner, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const apartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'تم تحديث الشقة بنجاح / Apartment updated successfully',
      apartment
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تحديث الشقة / Error updating apartment',
      error: error.message
    });
  }
});

// حذف شقة / Delete apartment
router.delete('/:id', authenticateToken, requireUserType('owner'), requireApartmentOwner, async (req, res) => {
  try {
    await Apartment.findByIdAndDelete(req.params.id);

    // تحديث معلومات المالك / Update owner information
    const Owner = require('../models/Owner');
    await Owner.findByIdAndUpdate(req.user._id, {
      $pull: { ownedApartments: { apartmentId: req.params.id } }
    });

    res.json({
      message: 'تم حذف الشقة بنجاح / Apartment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في حذف الشقة / Error deleting apartment',
      error: error.message
    });
  }
});

// رفع صور الشقة / Upload apartment photos
router.post('/:id/photos', authenticateToken, requireUserType('owner'), requireApartmentOwner, async (req, res) => {
  try {
    const { photos, photoType } = req.body; // photoType: 'exterior', 'interior', 'rooms'

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({
        message: 'الصور مطلوبة / Photos are required',
        error: 'MISSING_PHOTOS'
      });
    }

    const apartment = await Apartment.findById(req.params.id);
    
    if (photoType === 'exterior') {
      apartment.photos.exterior = [...apartment.photos.exterior, ...photos];
    } else if (photoType === 'interior') {
      apartment.photos.interior = [...apartment.photos.interior, ...photos];
    } else if (photoType === 'rooms') {
      // إضافة صور الغرف / Add room photos
      const { roomType } = req.body;
      if (!roomType) {
        return res.status(400).json({
          message: 'نوع الغرفة مطلوب / Room type is required',
          error: 'MISSING_ROOM_TYPE'
        });
      }
      
      const existingRoom = apartment.photos.rooms.find(room => room.roomType === roomType);
      if (existingRoom) {
        existingRoom.photos = [...existingRoom.photos, ...photos];
      } else {
        apartment.photos.rooms.push({ roomType, photos });
      }
    }

    await apartment.save();

    res.json({
      message: 'تم رفع الصور بنجاح / Photos uploaded successfully',
      apartment: {
        id: apartment._id,
        photos: apartment.photos
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع الصور / Error uploading photos',
      error: error.message
    });
  }
});

// إضافة أثاث / Add furniture
router.post('/:id/furniture', authenticateToken, requireUserType('owner'), requireApartmentOwner, async (req, res) => {
  try {
    const { item, condition, description, photos } = req.body;

    if (!item) {
      return res.status(400).json({
        message: 'اسم القطعة مطلوب / Item name is required',
        error: 'MISSING_ITEM_NAME'
      });
    }

    const apartment = await Apartment.findById(req.params.id);
    apartment.furniture.push({
      item,
      condition: condition || 'good',
      description,
      photos: photos || []
    });

    await apartment.save();

    res.json({
      message: 'تم إضافة الأثاث بنجاح / Furniture added successfully',
      furniture: apartment.furniture
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في إضافة الأثاث / Error adding furniture',
      error: error.message
    });
  }
});

// إضافة أجهزة / Add appliances
router.post('/:id/appliances', authenticateToken, requireUserType('owner'), requireApartmentOwner, async (req, res) => {
  try {
    const { item, brand, model, condition, serialNumber, photos } = req.body;

    if (!item) {
      return res.status(400).json({
        message: 'اسم الجهاز مطلوب / Appliance name is required',
        error: 'MISSING_APPLIANCE_NAME'
      });
    }

    const apartment = await Apartment.findById(req.params.id);
    apartment.appliances.push({
      item,
      brand,
      model,
      condition: condition || 'good',
      serialNumber,
      photos: photos || []
    });

    await apartment.save();

    res.json({
      message: 'تم إضافة الجهاز بنجاح / Appliance added successfully',
      appliances: apartment.appliances
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في إضافة الجهاز / Error adding appliance',
      error: error.message
    });
  }
});

// تحديث حالة الشقة / Update apartment status
router.put('/:id/status', authenticateToken, requireUserType('owner'), requireApartmentOwner, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['available', 'occupied', 'maintenance', 'unavailable'].includes(status)) {
      return res.status(400).json({
        message: 'حالة غير صحيحة / Invalid status',
        error: 'INVALID_STATUS'
      });
    }

    const apartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: 'تم تحديث حالة الشقة بنجاح / Apartment status updated successfully',
      apartment: {
        id: apartment._id,
        status: apartment.status
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تحديث حالة الشقة / Error updating apartment status',
      error: error.message
    });
  }
});

module.exports = router;
