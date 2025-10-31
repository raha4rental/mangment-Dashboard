const multer = require('multer');
const path = require('path');
const fs = require('fs');

// إنشاء مجلد الرفع إذا لم يكن موجوداً / Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// إعداد multer للتخزين المحلي / Configure multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(uploadDir, req.params.type || 'general');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // إنشاء اسم ملف فريد / Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// تصفية الملفات المسموحة / Filter allowed files
const fileFilter = (req, file, cb) => {
  // التحقق من نوع الملف / Check file type
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم. يرجى رفع صور فقط / File type not supported. Please upload images only'));
  }
};

// إعداد multer / Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files
  },
  fileFilter: fileFilter
});

// معالج الأخطاء / Error handler
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'حجم الملف كبير جداً. الحد الأقصى 5MB / File size too large. Maximum 5MB',
        error: 'FILE_TOO_LARGE'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        message: 'عدد الملفات كبير جداً. الحد الأقصى 10 ملفات / Too many files. Maximum 10 files',
        error: 'TOO_MANY_FILES'
      });
    }
  }
  
  if (error.message.includes('File type not supported')) {
    return res.status(400).json({
      message: 'نوع الملف غير مدعوم. يرجى رفع صور فقط / File type not supported. Please upload images only',
      error: 'INVALID_FILE_TYPE'
    });
  }
  
  next(error);
};

// دالة لرفع ملف واحد / Single file upload function
const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadSingleFile = upload.single(fieldName);
    uploadSingleFile(req, res, (err) => {
      if (err) {
        return handleUploadError(err, req, res, next);
      }
      next();
    });
  };
};

// دالة لرفع عدة ملفات / Multiple files upload function
const uploadMultiple = (fieldName, maxCount = 10) => {
  return (req, res, next) => {
    const uploadMultipleFiles = upload.array(fieldName, maxCount);
    uploadMultipleFiles(req, res, (err) => {
      if (err) {
        return handleUploadError(err, req, res, next);
      }
      next();
    });
  };
};

// دالة لرفع ملفات متعددة مع أسماء حقول مختلفة / Multiple fields upload function
const uploadFields = (fields) => {
  return (req, res, next) => {
    const uploadMultipleFields = upload.fields(fields);
    uploadMultipleFields(req, res, (err) => {
      if (err) {
        return handleUploadError(err, req, res, next);
      }
      next();
    });
  };
};

// دالة لحذف الملف / Delete file function
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

// دالة لحذف عدة ملفات / Delete multiple files function
const deleteFiles = (filePaths) => {
  const results = [];
  filePaths.forEach(filePath => {
    results.push(deleteFile(filePath));
  });
  return results;
};

// دالة للحصول على مسار الملف النسبي / Get relative file path function
const getRelativePath = (filePath) => {
  const uploadsDir = path.join(__dirname, '../uploads');
  return path.relative(uploadsDir, filePath);
};

// دالة للحصول على URL الملف / Get file URL function
const getFileUrl = (req, filePath) => {
  const relativePath = getRelativePath(filePath);
  return `${req.protocol}://${req.get('host')}/uploads/${relativePath.replace(/\\/g, '/')}`;
};

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  deleteFile,
  deleteFiles,
  getRelativePath,
  getFileUrl,
  handleUploadError
};
