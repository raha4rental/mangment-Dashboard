const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { uploadSingle, uploadMultiple, uploadFields, getFileUrl, deleteFile } = require('../middleware/upload');

const router = express.Router();

// رفع صورة واحدة / Upload single image
router.post('/single/:type', authenticateToken, uploadSingle('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'لم يتم رفع أي ملف / No file uploaded',
        error: 'NO_FILE'
      });
    }

    const fileUrl = getFileUrl(req, req.file.path);
    
    res.json({
      message: 'تم رفع الصورة بنجاح / Image uploaded successfully',
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع الصورة / Error uploading image',
      error: error.message
    });
  }
});

// رفع عدة صور / Upload multiple images
router.post('/multiple/:type', authenticateToken, uploadMultiple('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'لم يتم رفع أي ملفات / No files uploaded',
        error: 'NO_FILES'
      });
    }

    const files = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      url: getFileUrl(req, file.path)
    }));
    
    res.json({
      message: 'تم رفع الصور بنجاح / Images uploaded successfully',
      files,
      count: files.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع الصور / Error uploading images',
      error: error.message
    });
  }
});

// رفع صور متعددة مع أسماء حقول مختلفة / Upload multiple images with different field names
router.post('/fields/:type', authenticateToken, uploadFields([
  { name: 'front', maxCount: 1 },
  { name: 'back', maxCount: 1 },
  { name: 'additional', maxCount: 5 }
]), (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message: 'لم يتم رفع أي ملفات / No files uploaded',
        error: 'NO_FILES'
      });
    }

    const uploadedFiles = {};
    
    Object.keys(req.files).forEach(fieldName => {
      const files = req.files[fieldName];
      uploadedFiles[fieldName] = files.map(file => ({
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        size: file.size,
        url: getFileUrl(req, file.path)
      }));
    });
    
    res.json({
      message: 'تم رفع الملفات بنجاح / Files uploaded successfully',
      files: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع الملفات / Error uploading files',
      error: error.message
    });
  }
});

// رفع صور الهوية / Upload ID photos
router.post('/id-photos', authenticateToken, uploadFields([
  { name: 'front', maxCount: 1 },
  { name: 'back', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files || !req.files.front || !req.files.back) {
      return res.status(400).json({
        message: 'صور الهوية الأمامية والخلفية مطلوبة / Front and back ID photos are required',
        error: 'MISSING_ID_PHOTOS'
      });
    }

    const frontPhoto = {
      originalName: req.files.front[0].originalname,
      filename: req.files.front[0].filename,
      path: req.files.front[0].path,
      size: req.files.front[0].size,
      url: getFileUrl(req, req.files.front[0].path)
    };

    const backPhoto = {
      originalName: req.files.back[0].originalname,
      filename: req.files.back[0].filename,
      path: req.files.back[0].path,
      size: req.files.back[0].size,
      url: getFileUrl(req, req.files.back[0].path)
    };
    
    res.json({
      message: 'تم رفع صور الهوية بنجاح / ID photos uploaded successfully',
      idPhotos: {
        front: frontPhoto,
        back: backPhoto
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع صور الهوية / Error uploading ID photos',
      error: error.message
    });
  }
});

// رفع صور الشقة / Upload apartment photos
router.post('/apartment-photos/:apartmentId', authenticateToken, uploadMultiple('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'لم يتم رفع أي صور / No images uploaded',
        error: 'NO_IMAGES'
      });
    }

    const { photoType, roomType } = req.body; // photoType: 'exterior', 'interior', 'rooms'

    if (!photoType) {
      return res.status(400).json({
        message: 'نوع الصور مطلوب / Photo type is required',
        error: 'MISSING_PHOTO_TYPE'
      });
    }

    const files = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      url: getFileUrl(req, file.path)
    }));
    
    res.json({
      message: 'تم رفع صور الشقة بنجاح / Apartment photos uploaded successfully',
      files,
      photoType,
      roomType,
      count: files.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع صور الشقة / Error uploading apartment photos',
      error: error.message
    });
  }
});

// رفع صور الأثاث / Upload furniture photos
router.post('/furniture-photos', authenticateToken, uploadMultiple('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'لم يتم رفع أي صور / No images uploaded',
        error: 'NO_IMAGES'
      });
    }

    const files = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      url: getFileUrl(req, file.path)
    }));
    
    res.json({
      message: 'تم رفع صور الأثاث بنجاح / Furniture photos uploaded successfully',
      files,
      count: files.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع صور الأثاث / Error uploading furniture photos',
      error: error.message
    });
  }
});

// رفع صور الأجهزة / Upload appliance photos
router.post('/appliance-photos', authenticateToken, uploadMultiple('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'لم يتم رفع أي صور / No images uploaded',
        error: 'NO_IMAGES'
      });
    }

    const files = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      url: getFileUrl(req, file.path)
    }));
    
    res.json({
      message: 'تم رفع صور الأجهزة بنجاح / Appliance photos uploaded successfully',
      files,
      count: files.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع صور الأجهزة / Error uploading appliance photos',
      error: error.message
    });
  }
});

// رفع صور المشاكل / Upload issue photos
router.post('/issue-photos', authenticateToken, uploadMultiple('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'لم يتم رفع أي صور / No images uploaded',
        error: 'NO_IMAGES'
      });
    }

    const files = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      url: getFileUrl(req, file.path)
    }));
    
    res.json({
      message: 'تم رفع صور المشاكل بنجاح / Issue photos uploaded successfully',
      files,
      count: files.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع صور المشاكل / Error uploading issue photos',
      error: error.message
    });
  }
});

// رفع توقيع / Upload signature
router.post('/signature', authenticateToken, uploadSingle('signature'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'لم يتم رفع التوقيع / No signature uploaded',
        error: 'NO_SIGNATURE'
      });
    }

    const fileUrl = getFileUrl(req, req.file.path);
    
    res.json({
      message: 'تم رفع التوقيع بنجاح / Signature uploaded successfully',
      signature: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في رفع التوقيع / Error uploading signature',
      error: error.message
    });
  }
});

// حذف ملف / Delete file
router.delete('/file', authenticateToken, (req, res) => {
  try {
    const { filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({
        message: 'مسار الملف مطلوب / File path is required',
        error: 'MISSING_FILE_PATH'
      });
    }

    const deleted = deleteFile(filePath);
    
    if (deleted) {
      res.json({
        message: 'تم حذف الملف بنجاح / File deleted successfully'
      });
    } else {
      res.status(404).json({
        message: 'الملف غير موجود / File not found',
        error: 'FILE_NOT_FOUND'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'خطأ في حذف الملف / Error deleting file',
      error: error.message
    });
  }
});

module.exports = router;
