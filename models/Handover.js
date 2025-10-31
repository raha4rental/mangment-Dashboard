const mongoose = require('mongoose');

const handoverSchema = new mongoose.Schema({
  // معلومات الشقة / Apartment Information
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment',
    required: [true, 'معرف الشقة مطلوب / Apartment ID is required']
  },
  
  // معلومات المستأجر / Tenant Information
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'معرف المستأجر مطلوب / Tenant ID is required']
  },
  
  // معلومات المالك / Owner Information
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: [true, 'معرف المالك مطلوب / Owner ID is required']
  },
  
  // نوع التسليم / Handover Type
  handoverType: {
    type: String,
    enum: ['initial', 'final', 'inspection'],
    required: [true, 'نوع التسليم مطلوب / Handover type is required']
  },
  
  // تاريخ التسليم / Handover Date
  handoverDate: {
    type: Date,
    required: [true, 'تاريخ التسليم مطلوب / Handover date is required']
  },
  
  // حالة التسليم / Handover Status
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'disputed'],
    default: 'pending'
  },
  
  // تفاصيل الأثاث والأجهزة / Furniture and Appliances Details
  furnitureChecklist: [{
    item: String,
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor', 'damaged']
    },
    notes: String,
    photos: [String], // صور الحالة / Condition photos
    isPresent: {
      type: Boolean,
      default: true
    }
  }],
  
  // تفاصيل الأجهزة / Appliances Details
  appliancesChecklist: [{
    item: String,
    brand: String,
    model: String,
    serialNumber: String,
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor', 'damaged']
    },
    isWorking: {
      type: Boolean,
      default: true
    },
    notes: String,
    photos: [String] // صور الحالة / Condition photos
  }],
  
  // فحص الغرف / Room Inspection
  roomInspection: [{
    roomType: String, // نوع الغرفة / Room type
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor', 'damaged']
    },
    notes: String,
    photos: [String], // صور الغرفة / Room photos
    issues: [{
      description: String,
      severity: {
        type: String,
        enum: ['minor', 'moderate', 'major', 'critical']
      },
      photos: [String]
    }]
  }],
  
  // فحص المرافق / Utilities Inspection
  utilitiesInspection: {
    electricity: {
      working: Boolean,
      notes: String,
      photos: [String]
    },
    water: {
      working: Boolean,
      notes: String,
      photos: [String]
    },
    gas: {
      working: Boolean,
      notes: String,
      photos: [String]
    },
    internet: {
      working: Boolean,
      notes: String,
      photos: [String]
    },
    airConditioning: {
      working: Boolean,
      notes: String,
      photos: [String]
    }
  },
  
  // المفاتيح / Keys
  keys: {
    mainDoor: {
      provided: Boolean,
      count: Number,
      notes: String
    },
    roomKeys: [{
      room: String,
      provided: Boolean,
      count: Number,
      notes: String
    }],
    parkingKey: {
      provided: Boolean,
      count: Number,
      notes: String
    },
    elevatorKey: {
      provided: Boolean,
      count: Number,
      notes: String
    }
  },
  
  // المستندات / Documents
  documents: [{
    type: String, // نوع المستند / Document type
    name: String, // اسم المستند / Document name
    filePath: String, // مسار الملف / File path
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // التوقيعات / Signatures
  signatures: {
    tenant: {
      signed: Boolean,
      signaturePath: String, // مسار التوقيع / Signature path
      signedAt: Date
    },
    owner: {
      signed: Boolean,
      signaturePath: String, // مسار التوقيع / Signature path
      signedAt: Date
    },
    witness: {
      name: String,
      id: String,
      signaturePath: String, // مسار التوقيع / Signature path
      signedAt: Date
    }
  },
  
  // الملاحظات العامة / General Notes
  generalNotes: String,
  
  // قائمة المشاكل / Issues List
  issues: [{
    description: String,
    severity: {
      type: String,
      enum: ['minor', 'moderate', 'major', 'critical']
    },
    category: {
      type: String,
      enum: ['furniture', 'appliances', 'utilities', 'structure', 'other']
    },
    photos: [String],
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reportedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['reported', 'acknowledged', 'in_progress', 'resolved'],
      default: 'reported'
    }
  }],
  
  // الضمان / Guarantee
  guarantee: {
    amount: Number,
    currency: {
      type: String,
      default: 'EGP'
    },
    conditions: [String], // شروط الضمان / Guarantee conditions
    returnConditions: [String] // شروط استرداد الضمان / Guarantee return conditions
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
handoverSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// إضافة فهرس للبحث / Add indexes for search
handoverSchema.index({ apartmentId: 1 });
handoverSchema.index({ tenantId: 1 });
handoverSchema.index({ ownerId: 1 });
handoverSchema.index({ handoverDate: 1 });
handoverSchema.index({ status: 1 });

module.exports = mongoose.model('Handover', handoverSchema);
