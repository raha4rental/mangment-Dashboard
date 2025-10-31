const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ownerSchema = new mongoose.Schema({
  // معلومات شخصية / Personal Information
  firstName: {
    type: String,
    required: [true, 'الاسم الأول مطلوب / First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'الاسم الأخير مطلوب / Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب / Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'رقم الهاتف مطلوب / Phone number is required'],
    trim: true
  },
  nationalId: {
    type: String,
    required: [true, 'رقم الهوية مطلوب / National ID is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'كلمة المرور مطلوبة / Password is required'],
    minlength: [6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل / Password must be at least 6 characters']
  },
  
  // معلومات العنوان / Address Information
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  
  // معلومات إضافية / Additional Information
  dateOfBirth: Date,
  occupation: String,
  companyName: String,
  
  // معلومات البنك / Banking Information
  bankInfo: {
    bankName: String,
    accountNumber: String,
    iban: String
  },
  
  // حالة الحساب / Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // معلومات الشقق المملوكة / Owned Apartments Information
  ownedApartments: [{
    apartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apartment'
    },
    purchaseDate: Date,
    purchasePrice: Number
  }],
  
  // صور الهوية / ID Photos
  idPhotos: [{
    front: String, // مسار الصورة الأمامية / Front photo path
    back: String   // مسار الصورة الخلفية / Back photo path
  }],
  
  // إعدادات الإشعارات / Notification Settings
  notificationSettings: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: true
    },
    newRentalAlerts: {
      type: Boolean,
      default: true
    },
    maintenanceAlerts: {
      type: Boolean,
      default: true
    },
    paymentReminders: {
      type: Boolean,
      default: true
    }
  },
  
  // تاريخ الإنشاء والتحديث / Creation and Update Dates
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// تشفير كلمة المرور قبل الحفظ / Hash password before saving
ownerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// تحديث تاريخ التعديل / Update modification date
ownerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// مقارنة كلمة المرور / Compare password method
ownerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// إخفاء كلمة المرور من النتيجة / Hide password from result
ownerSchema.methods.toJSON = function() {
  const owner = this.toObject();
  delete owner.password;
  return owner;
};

module.exports = mongoose.model('Owner', ownerSchema);
