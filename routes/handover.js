const express = require('express');
const { body, validationResult } = require('express-validator');
const Handover = require('../models/Handover');
const Apartment = require('../models/Apartment');
const { authenticateToken, requireUserType, requireApartmentOwner, requireApartmentTenant } = require('../middleware/auth');
const { uploadMultiple, getFileUrl } = require('../middleware/upload');

const router = express.Router();

// الحصول على جميع التسليمات (عام) / Get all handovers (public)
router.get('/public', async (req, res) => {
  try {
    const { handoverType, status, page = 1, limit = 10 } = req.query;
    
    const searchCriteria = {};
    
    if (handoverType) {
      searchCriteria.handoverType = handoverType;
    }
    
    if (status) {
      searchCriteria.status = status;
    }

    const handovers = await Handover.find(searchCriteria)
      .populate('apartmentId', 'apartmentNumber buildingName address')
      .populate('tenantId', 'firstName lastName email phone')
      .populate('ownerId', 'firstName lastName email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ handoverDate: -1 });

    const total = await Handover.countDocuments(searchCriteria);

    res.json({
      message: 'تم الحصول على التسليمات / Handovers retrieved',
      handovers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على التسليمات / Error retrieving handovers',
      error: error.message
    });
  }
});

// إنشاء تسليم جديد / Create new handover
router.post('/', [
  body('apartmentId').notEmpty().withMessage('معرف الشقة مطلوب / Apartment ID is required'),
  body('handoverType').isIn(['initial', 'final', 'inspection']).withMessage('نوع التسليم غير صحيح / Invalid handover type'),
  body('handoverDate').isISO8601().withMessage('تاريخ التسليم غير صحيح / Invalid handover date')
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { apartmentId, handoverType, handoverDate, furnitureChecklist, appliancesChecklist, roomInspection, utilitiesInspection, keys, generalNotes } = req.body;

    // التحقق من وجود الشقة / Check if apartment exists
    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({
        message: 'الشقة غير موجودة / Apartment not found',
        error: 'APARTMENT_NOT_FOUND'
      });
    }

    // التحقق من صلاحيات المستخدم / Check user permissions
    const isOwner = apartment.ownerId.toString() === req.user._id.toString();
    const isTenant = apartment.currentTenant && apartment.currentTenant.customerId.toString() === req.user._id.toString();

    if (!isOwner && !isTenant) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول لهذه الشقة / Access denied to this apartment',
        error: 'ACCESS_DENIED'
      });
    }

    // تحديد معرفات المستخدمين / Determine user IDs
    let tenantId, ownerId;
    if (req.userType === 'customer') {
      tenantId = req.user._id;
      ownerId = apartment.ownerId;
    } else {
      ownerId = req.user._id;
      tenantId = apartment.currentTenant ? apartment.currentTenant.customerId : null;
    }

    if (!tenantId) {
      return res.status(400).json({
        message: 'لا يوجد مستأجر للشقة / No tenant for this apartment',
        error: 'NO_TENANT'
      });
    }

    // إنشاء تسليم جديد / Create new handover
    const handover = new Handover({
      apartmentId,
      tenantId,
      ownerId,
      handoverType,
      handoverDate: new Date(handoverDate),
      furnitureChecklist: furnitureChecklist || [],
      appliancesChecklist: appliancesChecklist || [],
      roomInspection: roomInspection || [],
      utilitiesInspection: utilitiesInspection || {},
      keys: keys || {},
      generalNotes
    });

    await handover.save();

    res.status(201).json({
      message: 'تم إنشاء التسليم بنجاح / Handover created successfully',
      handover
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في إنشاء التسليم / Error creating handover',
      error: error.message
    });
  }
});

// الحصول على تسليم / Get handover
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const handover = await Handover.findById(req.params.id)
      .populate('apartmentId', 'apartmentNumber buildingName address')
      .populate('tenantId', 'firstName lastName email phone')
      .populate('ownerId', 'firstName lastName email phone');

    if (!handover) {
      return res.status(404).json({
        message: 'التسليم غير موجود / Handover not found',
        error: 'HANDOVER_NOT_FOUND'
      });
    }

    // التحقق من صلاحيات المستخدم / Check user permissions
    const isOwner = handover.ownerId._id.toString() === req.user._id.toString();
    const isTenant = handover.tenantId._id.toString() === req.user._id.toString();

    if (!isOwner && !isTenant) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول لهذا التسليم / Access denied to this handover',
        error: 'ACCESS_DENIED'
      });
    }

    res.json({
      message: 'تم الحصول على التسليم / Handover retrieved',
      handover
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على التسليم / Error retrieving handover',
      error: error.message
    });
  }
});

// تحديث تسليم / Update handover
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const handover = await Handover.findById(req.params.id);

    if (!handover) {
      return res.status(404).json({
        message: 'التسليم غير موجود / Handover not found',
        error: 'HANDOVER_NOT_FOUND'
      });
    }

    // التحقق من صلاحيات المستخدم / Check user permissions
    const isOwner = handover.ownerId.toString() === req.user._id.toString();
    const isTenant = handover.tenantId.toString() === req.user._id.toString();

    if (!isOwner && !isTenant) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول لهذا التسليم / Access denied to this handover',
        error: 'ACCESS_DENIED'
      });
    }

    // تحديث التسليم / Update handover
    const updatedHandover = await Handover.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'تم تحديث التسليم بنجاح / Handover updated successfully',
      handover: updatedHandover
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تحديث التسليم / Error updating handover',
      error: error.message
    });
  }
});

// إضافة مشكلة / Add issue
router.post('/:id/issues', [
  body('description').notEmpty().withMessage('وصف المشكلة مطلوب / Issue description is required'),
  body('severity').isIn(['minor', 'moderate', 'major', 'critical']).withMessage('خطورة المشكلة غير صحيحة / Invalid issue severity'),
  body('category').isIn(['furniture', 'appliances', 'utilities', 'structure', 'other']).withMessage('فئة المشكلة غير صحيحة / Invalid issue category')
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const handover = await Handover.findById(req.params.id);

    if (!handover) {
      return res.status(404).json({
        message: 'التسليم غير موجود / Handover not found',
        error: 'HANDOVER_NOT_FOUND'
      });
    }

    // التحقق من صلاحيات المستخدم / Check user permissions
    const isOwner = handover.ownerId.toString() === req.user._id.toString();
    const isTenant = handover.tenantId.toString() === req.user._id.toString();

    if (!isOwner && !isTenant) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول لهذا التسليم / Access denied to this handover',
        error: 'ACCESS_DENIED'
      });
    }

    const { description, severity, category, photos } = req.body;

    const issue = {
      description,
      severity,
      category,
      photos: photos || [],
      reportedBy: req.user._id,
      reportedAt: new Date(),
      status: 'reported'
    };

    handover.issues.push(issue);
    await handover.save();

    res.json({
      message: 'تم إضافة المشكلة بنجاح / Issue added successfully',
      issue
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في إضافة المشكلة / Error adding issue',
      error: error.message
    });
  }
});

// رفع صور الشقة من قبل المستأجر عند الاستلام / Upload apartment photos by tenant during handover
router.post('/:id/apartment-photos', authenticateToken, uploadMultiple('photos', 20), async (req, res) => {
  try {
    const handover = await Handover.findById(req.params.id);

    if (!handover) {
      return res.status(404).json({
        message: 'التسليم غير موجود / Handover not found',
        error: 'HANDOVER_NOT_FOUND'
      });
    }

    // التحقق من أن المستخدم هو المستأجر / Check if user is the tenant
    if (handover.tenantId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'غير مصرح برفع الصور. فقط المستأجر يمكنه رفع صور الاستلام / Only tenant can upload handover photos',
        error: 'ACCESS_DENIED'
      });
    }

    const { photoCategory, description } = req.body; // photoCategory: 'exterior', 'interior', 'rooms', 'furniture', 'appliances'
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'لم يتم رفع أي صور / No photos uploaded',
        error: 'NO_PHOTOS'
      });
    }

    const uploadedPhotos = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      url: getFileUrl(req, file.path),
      uploadedAt: new Date(),
      uploadedBy: req.user._id,
      category: photoCategory || 'general',
      description: description || ''
    }));

    // إضافة الصور إلى المستندات / Add photos to documents
    if (!handover.documents) {
      handover.documents = [];
    }

    uploadedPhotos.forEach(photo => {
      handover.documents.push({
        type: 'apartment_photo',
        name: `صورة الشقة - ${photo.category}`,
        filePath: photo.path,
        uploadedBy: req.user._id,
        uploadedAt: photo.uploadedAt,
        metadata: {
          category: photo.category,
          description: photo.description,
          url: photo.url
        }
      });
    });

    await handover.save();

    res.json({
      message: 'تم رفع صور الشقة بنجاح / Apartment photos uploaded successfully',
      photos: uploadedPhotos,
      count: uploadedPhotos.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع الصور / Error uploading photos',
      error: error.message
    });
  }
});

// تحديث حالة المشكلة / Update issue status
router.put('/:id/issues/:issueId', [
  body('status').isIn(['reported', 'acknowledged', 'in_progress', 'resolved']).withMessage('حالة المشكلة غير صحيحة / Invalid issue status')
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { issueId } = req.params;
    const { status, notes } = req.body;

    const handover = await Handover.findById(req.params.id);

    if (!handover) {
      return res.status(404).json({
        message: 'التسليم غير موجود / Handover not found',
        error: 'HANDOVER_NOT_FOUND'
      });
    }

    // التحقق من صلاحيات المستخدم / Check user permissions
    const isOwner = handover.ownerId.toString() === req.user._id.toString();
    const isTenant = handover.tenantId.toString() === req.user._id.toString();

    if (!isOwner && !isTenant) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول لهذا التسليم / Access denied to this handover',
        error: 'ACCESS_DENIED'
      });
    }

    const issue = handover.issues.id(issueId);
    if (!issue) {
      return res.status(404).json({
        message: 'المشكلة غير موجودة / Issue not found',
        error: 'ISSUE_NOT_FOUND'
      });
    }

    issue.status = status;
    if (notes) {
      issue.notes = notes;
    }

    await handover.save();

    res.json({
      message: 'تم تحديث حالة المشكلة بنجاح / Issue status updated successfully',
      issue
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تحديث حالة المشكلة / Error updating issue status',
      error: error.message
    });
  }
});

// إضافة توقيع / Add signature
router.post('/:id/signatures', [
  body('signatureType').isIn(['tenant', 'owner', 'witness']).withMessage('نوع التوقيع غير صحيح / Invalid signature type'),
  body('signaturePath').notEmpty().withMessage('مسار التوقيع مطلوب / Signature path is required')
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { signatureType, signaturePath, witnessName, witnessId } = req.body;

    const handover = await Handover.findById(req.params.id);

    if (!handover) {
      return res.status(404).json({
        message: 'التسليم غير موجود / Handover not found',
        error: 'HANDOVER_NOT_FOUND'
      });
    }

    // التحقق من صلاحيات المستخدم / Check user permissions
    const isOwner = handover.ownerId.toString() === req.user._id.toString();
    const isTenant = handover.tenantId.toString() === req.user._id.toString();

    if (!isOwner && !isTenant) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول لهذا التسليم / Access denied to this handover',
        error: 'ACCESS_DENIED'
      });
    }

    // التحقق من نوع التوقيع / Check signature type
    if (signatureType === 'tenant' && !isTenant) {
      return res.status(403).json({
        message: 'غير مصرح بالتوقيع كـ مستأجر / Not authorized to sign as tenant',
        error: 'NOT_TENANT'
      });
    }

    if (signatureType === 'owner' && !isOwner) {
      return res.status(403).json({
        message: 'غير مصرح بالتوقيع كـ مالك / Not authorized to sign as owner',
        error: 'NOT_OWNER'
      });
    }

    // تحديث التوقيع / Update signature
    if (signatureType === 'tenant') {
      handover.signatures.tenant = {
        signed: true,
        signaturePath,
        signedAt: new Date()
      };
    } else if (signatureType === 'owner') {
      handover.signatures.owner = {
        signed: true,
        signaturePath,
        signedAt: new Date()
      };
    } else if (signatureType === 'witness') {
      handover.signatures.witness = {
        name: witnessName,
        id: witnessId,
        signaturePath,
        signedAt: new Date()
      };
    }

    await handover.save();

    res.json({
      message: 'تم إضافة التوقيع بنجاح / Signature added successfully',
      signature: handover.signatures[signatureType]
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في إضافة التوقيع / Error adding signature',
      error: error.message
    });
  }
});

// الحصول على تسليمات الشقة / Get apartment handovers
router.get('/apartment/:apartmentId', authenticateToken, async (req, res) => {
  try {
    const { apartmentId } = req.params;
    const { handoverType, status } = req.query;

    const searchCriteria = { apartmentId };
    if (handoverType) {
      searchCriteria.handoverType = handoverType;
    }
    if (status) {
      searchCriteria.status = status;
    }

    const handovers = await Handover.find(searchCriteria)
      .populate('tenantId', 'firstName lastName email phone')
      .populate('ownerId', 'firstName lastName email phone')
      .sort({ handoverDate: -1 });

    res.json({
      message: 'تم الحصول على تسليمات الشقة / Apartment handovers retrieved',
      handovers
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على تسليمات الشقة / Error retrieving apartment handovers',
      error: error.message
    });
  }
});

// تحديث حالة التسليم / Update handover status
router.put('/:id/status', [
  body('status').isIn(['pending', 'in_progress', 'completed', 'disputed']).withMessage('حالة التسليم غير صحيحة / Invalid handover status')
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'بيانات غير صحيحة / Invalid data',
        errors: errors.array()
      });
    }

    const { status } = req.body;

    const handover = await Handover.findById(req.params.id);

    if (!handover) {
      return res.status(404).json({
        message: 'التسليم غير موجود / Handover not found',
        error: 'HANDOVER_NOT_FOUND'
      });
    }

    // التحقق من صلاحيات المستخدم / Check user permissions
    const isOwner = handover.ownerId.toString() === req.user._id.toString();
    const isTenant = handover.tenantId.toString() === req.user._id.toString();

    if (!isOwner && !isTenant) {
      return res.status(403).json({
        message: 'غير مصرح بالوصول لهذا التسليم / Access denied to this handover',
        error: 'ACCESS_DENIED'
      });
    }

    handover.status = status;
    await handover.save();

    res.json({
      message: 'تم تحديث حالة التسليم بنجاح / Handover status updated successfully',
      handover: {
        id: handover._id,
        status: handover.status
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في تحديث حالة التسليم / Error updating handover status',
      error: error.message
    });
  }
});

// الحصول على جميع التسليمات / Get all handovers
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { handoverType, status, page = 1, limit = 10 } = req.query;
    
    const searchCriteria = {};
    
    // Filter by user type
    if (req.userType === 'owner') {
      searchCriteria.ownerId = req.user._id;
    } else if (req.userType === 'customer') {
      searchCriteria.tenantId = req.user._id;
    }
    
    if (handoverType) {
      searchCriteria.handoverType = handoverType;
    }
    
    if (status) {
      searchCriteria.status = status;
    }

    const handovers = await Handover.find(searchCriteria)
      .populate('apartmentId', 'apartmentNumber buildingName address')
      .populate('tenantId', 'firstName lastName email phone')
      .populate('ownerId', 'firstName lastName email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ handoverDate: -1 });

    const total = await Handover.countDocuments(searchCriteria);

    res.json({
      message: 'تم الحصول على التسليمات / Handovers retrieved',
      handovers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في الحصول على التسليمات / Error retrieving handovers',
      error: error.message
    });
  }
});

module.exports = router;
