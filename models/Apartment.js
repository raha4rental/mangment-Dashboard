const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  // معلومات الشقة الأساسية / Basic Apartment Information
  apartmentNumber: {
    type: String,
    required: [true, 'رقم الشقة مطلوب / Apartment number is required'],
    unique: true,
    trim: true
  },
  buildingName: {
    type: String,
    required: [true, 'اسم المبنى مطلوب / Building name is required'],
    trim: true
  },
  address: {
    street: {
      type: String,
      required: [true, 'اسم الشارع مطلوب / Street name is required']
    },
    city: {
      type: String,
      required: [true, 'المدينة مطلوبة / City is required']
    },
    state: {
      type: String,
      required: [true, 'المحافظة مطلوبة / State is required']
    },
    zipCode: String,
    country: {
      type: String,
      default: 'Egypt'
    }
  },
  
  // معلومات المالك / Owner Information
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: [true, 'معرف المالك مطلوب / Owner ID is required']
  },
  
  // معلومات المستأجر الحالي / Current Tenant Information
  currentTenant: {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    startDate: Date,
    endDate: Date,
    rentAmount: Number,
    depositAmount: Number
  },
  
  // مواصفات الشقة / Apartment Specifications
  specifications: {
    bedrooms: {
      type: Number,
      required: [true, 'عدد الغرف مطلوب / Number of bedrooms is required'],
      min: [0, 'عدد الغرف يجب أن يكون صفر أو أكثر / Number of bedrooms must be 0 or more']
    },
    bathrooms: {
      type: Number,
      required: [true, 'عدد الحمامات مطلوب / Number of bathrooms is required'],
      min: [1, 'عدد الحمامات يجب أن يكون واحد على الأقل / Number of bathrooms must be at least 1']
    },
    area: {
      type: Number,
      required: [true, 'المساحة مطلوبة / Area is required'],
      min: [1, 'المساحة يجب أن تكون أكبر من صفر / Area must be greater than 0']
    },
    floor: {
      type: Number,
      required: [true, 'الطابق مطلوب / Floor is required']
    },
    hasBalcony: {
      type: Boolean,
      default: false
    },
    hasElevator: {
      type: Boolean,
      default: false
    },
    hasParking: {
      type: Boolean,
      default: false
    }
  },
  
  // الأثاث والأجهزة / Furniture and Appliances
  furniture: [{
    item: String,
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor', 'damaged'],
      default: 'good'
    },
    description: String,
    photos: [String] // مسارات الصور / Photo paths
  }],
  
  appliances: [{
    item: String,
    brand: String,
    model: String,
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor', 'damaged'],
      default: 'good'
    },
    serialNumber: String,
    photos: [String] // مسارات الصور / Photo paths
  }],
  
  // صور الشقة / Apartment Photos
  photos: {
    exterior: [String], // صور خارجية / Exterior photos
    interior: [String], // صور داخلية / Interior photos
    rooms: [{
      roomType: String, // نوع الغرفة / Room type
      photos: [String] // صور الغرفة / Room photos
    }]
  },
  
  // حالة الشقة / Apartment Status
  status: {
    type: String,
    enum: ['available', 'occupied', 'maintenance', 'unavailable'],
    default: 'available'
  },
  
  // معلومات الإيجار / Rental Information
  rentalInfo: {
    monthlyRent: {
      type: Number,
      required: [true, 'الإيجار الشهري مطلوب / Monthly rent is required']
    },
    deposit: {
      type: Number,
      required: [true, 'الضمان مطلوب / Deposit is required']
    },
    utilities: {
      electricity: Boolean,
      water: Boolean,
      gas: Boolean,
      internet: Boolean,
      maintenance: Boolean
    },
    leaseTerms: {
      minimumLease: Number, // الحد الأدنى للإيجار بالأشهر / Minimum lease in months
      noticePeriod: Number  // فترة الإشعار بالأيام / Notice period in days
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

// تحديث تاريخ التعديل / Update modification date
apartmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// إضافة فهرس للبحث / Add indexes for search
apartmentSchema.index({ apartmentNumber: 1 });
apartmentSchema.index({ buildingName: 1 });
apartmentSchema.index({ 'address.city': 1 });
apartmentSchema.index({ status: 1 });
apartmentSchema.index({ ownerId: 1 });

module.exports = mongoose.model('Apartment', apartmentSchema);
