# نظام إدارة الشقق / Apartment Management System

نظام شامل لإدارة الشقق يتيح للعملاء والملاك إدارة الشقق والإيجارات مع نظام ضمان شامل.

A comprehensive apartment management system that allows customers and owners to manage apartments and rentals with a comprehensive guarantee system.

## الميزات الرئيسية / Key Features

### للعملاء / For Customers
- ✅ تسجيل حساب جديد / New account registration
- ✅ رفع صور الهوية / ID photo upload
- ✅ البحث عن الشقق المتاحة / Search available apartments
- ✅ طلب استئجار شقة / Request apartment rental
- ✅ إدارة الشقق المستأجرة / Manage rented apartments
- ✅ نظام تسليم الشقة / Apartment handover system
- ✅ رفع صور الشقة / Upload apartment photos
- ✅ إدارة الضمان / Guarantee management

### للملاك / For Owners
- ✅ تسجيل حساب جديد / New account registration
- ✅ إضافة شقق جديدة / Add new apartments
- ✅ رفع صور الشقة / Upload apartment photos
- ✅ إدارة الأثاث والأجهزة / Manage furniture and appliances
- ✅ إدارة طلبات الإيجار / Manage rental requests
- ✅ نظام تسليم الشقة / Apartment handover system
- ✅ إحصائيات المالك / Owner statistics
- ✅ إعدادات الإشعارات / Notification settings

### نظام التسليم / Handover System
- ✅ تسليم أولي / Initial handover
- ✅ تسليم نهائي / Final handover
- ✅ فحص دوري / Periodic inspection
- ✅ فحص الأثاث والأجهزة / Furniture and appliances inspection
- ✅ فحص المرافق / Utilities inspection
- ✅ إدارة المفاتيح / Keys management
- ✅ نظام التوقيعات / Signatures system
- ✅ إدارة المشاكل / Issues management

## التقنيات المستخدمة / Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express-validator
- **Security**: bcryptjs for password hashing

## التثبيت / Installation

### المتطلبات / Requirements
- Node.js (v14 أو أحدث / v14 or later)
- MongoDB (v4.4 أو أحدث / v4.4 or later)
- npm أو yarn / npm or yarn

### خطوات التثبيت / Installation Steps

1. **استنساخ المشروع / Clone the project**
```bash
git clone <repository-url>
cd apartment-management-system
```

2. **تثبيت التبعيات / Install dependencies**
```bash
npm install
```

3. **إعداد متغيرات البيئة / Setup environment variables**
```bash
cp env.example .env
```

4. **تعديل ملف .env / Edit .env file**
```env
MONGODB_URI=mongodb://localhost:27017/apartment_management
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

5. **تشغيل الخادم / Start the server**
```bash
# للتطوير / For development
npm run dev

# للإنتاج / For production
npm start
```

## API Endpoints

### المصادقة / Authentication
- `POST /api/auth/customer/register` - تسجيل عميل جديد / Register new customer
- `POST /api/auth/customer/login` - تسجيل دخول العميل / Customer login
- `POST /api/auth/owner/register` - تسجيل مالك جديد / Register new owner
- `POST /api/auth/owner/login` - تسجيل دخول المالك / Owner login
- `GET /api/auth/verify` - التحقق من التوكن / Verify token
- `POST /api/auth/logout` - تسجيل الخروج / Logout

### العملاء / Customers
- `GET /api/customers/profile` - الحصول على معلومات العميل / Get customer profile
- `PUT /api/customers/profile` - تحديث معلومات العميل / Update customer profile
- `PUT /api/customers/change-password` - تغيير كلمة المرور / Change password
- `POST /api/customers/upload-id-photos` - رفع صور الهوية / Upload ID photos
- `GET /api/customers/apartments` - الحصول على الشقق المستأجرة / Get rented apartments
- `GET /api/customers/search-apartments` - البحث عن الشقق / Search apartments
- `POST /api/customers/request-rental/:apartmentId` - طلب استئجار شقة / Request apartment rental

### الشقق / Apartments
- `GET /api/apartments` - الحصول على جميع الشقق / Get all apartments
- `GET /api/apartments/:id` - الحصول على شقة واحدة / Get single apartment
- `POST /api/apartments` - إنشاء شقة جديدة / Create new apartment
- `PUT /api/apartments/:id` - تحديث شقة / Update apartment
- `DELETE /api/apartments/:id` - حذف شقة / Delete apartment
- `POST /api/apartments/:id/photos` - رفع صور الشقة / Upload apartment photos
- `POST /api/apartments/:id/furniture` - إضافة أثاث / Add furniture
- `POST /api/apartments/:id/appliances` - إضافة أجهزة / Add appliances
- `PUT /api/apartments/:id/status` - تحديث حالة الشقة / Update apartment status

### الملاك / Owners
- `GET /api/owners/profile` - الحصول على معلومات المالك / Get owner profile
- `PUT /api/owners/profile` - تحديث معلومات المالك / Update owner profile
- `PUT /api/owners/change-password` - تغيير كلمة المرور / Change password
- `GET /api/owners/apartments` - الحصول على الشقق المملوكة / Get owned apartments
- `GET /api/owners/rental-requests` - الحصول على طلبات الإيجار / Get rental requests
- `PUT /api/owners/rental-requests/:requestId/approve` - الموافقة على طلب إيجار / Approve rental request
- `PUT /api/owners/rental-requests/:requestId/reject` - رفض طلب إيجار / Reject rental request
- `PUT /api/owners/notification-settings` - تحديث إعدادات الإشعارات / Update notification settings
- `GET /api/owners/statistics` - الحصول على الإحصائيات / Get statistics

### التسليم / Handover
- `POST /api/handover` - إنشاء تسليم جديد / Create new handover
- `GET /api/handover/:id` - الحصول على تسليم / Get handover
- `PUT /api/handover/:id` - تحديث تسليم / Update handover
- `POST /api/handover/:id/issues` - إضافة مشكلة / Add issue
- `PUT /api/handover/:id/issues/:issueId` - تحديث حالة المشكلة / Update issue status
- `POST /api/handover/:id/signatures` - إضافة توقيع / Add signature
- `GET /api/handover/apartment/:apartmentId` - الحصول على تسليمات الشقة / Get apartment handovers
- `PUT /api/handover/:id/status` - تحديث حالة التسليم / Update handover status

### رفع الملفات / File Upload
- `POST /api/upload/single/:type` - رفع صورة واحدة / Upload single image
- `POST /api/upload/multiple/:type` - رفع عدة صور / Upload multiple images
- `POST /api/upload/fields/:type` - رفع صور متعددة مع أسماء حقول مختلفة / Upload multiple images with different field names
- `POST /api/upload/id-photos` - رفع صور الهوية / Upload ID photos
- `POST /api/upload/apartment-photos/:apartmentId` - رفع صور الشقة / Upload apartment photos
- `POST /api/upload/furniture-photos` - رفع صور الأثاث / Upload furniture photos
- `POST /api/upload/appliance-photos` - رفع صور الأجهزة / Upload appliance photos
- `POST /api/upload/issue-photos` - رفع صور المشاكل / Upload issue photos
- `POST /api/upload/signature` - رفع توقيع / Upload signature
- `DELETE /api/upload/file` - حذف ملف / Delete file

## قاعدة البيانات / Database Schema

### العملاء / Customers
- معلومات شخصية / Personal information
- معلومات العنوان / Address information
- صور الهوية / ID photos
- الشقق المستأجرة / Rented apartments

### الملاك / Owners
- معلومات شخصية / Personal information
- معلومات البنك / Banking information
- الشقق المملوكة / Owned apartments
- إعدادات الإشعارات / Notification settings

### الشقق / Apartments
- معلومات الشقة الأساسية / Basic apartment information
- مواصفات الشقة / Apartment specifications
- الأثاث والأجهزة / Furniture and appliances
- صور الشقة / Apartment photos
- معلومات الإيجار / Rental information

### التسليم / Handover
- معلومات الشقة والمستأجر / Apartment and tenant information
- فحص الأثاث والأجهزة / Furniture and appliances inspection
- فحص الغرف / Room inspection
- فحص المرافق / Utilities inspection
- المفاتيح / Keys
- التوقيعات / Signatures
- المشاكل / Issues

## الأمان / Security

- تشفير كلمات المرور باستخدام bcryptjs / Password hashing using bcryptjs
- مصادقة باستخدام JWT / Authentication using JWT
- التحقق من صلاحيات المستخدم / User permission verification
- التحقق من صحة البيانات / Data validation
- حماية من رفع الملفات الضارة / Protection against malicious file uploads

## التطوير / Development

### تشغيل في وضع التطوير / Run in development mode
```bash
npm run dev
```

### تشغيل الاختبارات / Run tests
```bash
npm test
```

### بناء المشروع / Build project
```bash
npm run build
```

## المساهمة / Contributing

1. Fork المشروع / Fork the project
2. إنشاء فرع للميزة الجديدة / Create a feature branch
3. Commit التغييرات / Commit your changes
4. Push إلى الفرع / Push to the branch
5. إنشاء Pull Request / Create a Pull Request

## الترخيص / License

هذا المشروع مرخص تحت رخصة MIT / This project is licensed under the MIT License.

## الدعم / Support

إذا واجهت أي مشاكل أو لديك أسئلة، يرجى فتح issue في المستودع / If you encounter any issues or have questions, please open an issue in the repository.

## التحديثات المستقبلية / Future Updates

- [ ] تطبيق موبايل / Mobile application
- [ ] نظام الدفع / Payment system
- [ ] إشعارات فورية / Real-time notifications
- [ ] تحليلات متقدمة / Advanced analytics
- [ ] تكامل مع الخرائط / Maps integration
- [ ] نظام التقييمات / Rating system
