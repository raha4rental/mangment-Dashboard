# معلومات المشروع الكاملة / Complete Project Information

## 📋 معلومات عامة / General Information

**اسم المشروع / Project Name:** RahaTeam - نظام إدارة الممتلكات  
**Project Name:** RahaTeam - Property Management System

**التاريخ / Date:** 14 فبراير 2025  
**Date:** February 14, 2025

## 🌐 معلومات النطاق / Domain Information

### النطاق الرئيسي / Main Domain:
- **rahaapt.com** ✅
- **www.rahaapt.com** ✅

### النطاقات البديلة / Alternative Domains:
- **rahaapt.vercel.app** ✅
- **rahaapt-9apghypu0-mangment.vercel.app** ✅

### مزود النطاق / Domain Provider:
- **Cloudflare Registrar**
- تم الشراء من: https://www.cloudflare.com

## 🚀 معلومات النشر / Deployment Information

### Platform:
- **Vercel** ✅

### Project ID:
```
prj_jk1OrFDonjMpjQgyqBzQXuqiTyPt
```

### Deployment URL:
```
rahaapt-9apghypu0-mangment.vercel.app
```

### Custom Domain:
```
rahaapt.vercel.app
```

### Production Domains:
- https://rahaapt.com
- https://www.rahaapt.com

## 🗄️ معلومات قاعدة البيانات / Database Information

### Provider:
- **MongoDB Atlas**

### Connection String:
```
mongodb+srv://raha4rental_db_user:aeu1J7WN@cluster0.njxd43.mongodb.net/apartment_management?retryWrites=true&w=majority
```

### Database Name:
```
apartment_management
```

### Cluster:
```
cluster0.njxd43.mongodb.net
```

### Username:
```
raha4rental_db_user
```

### Collections:
- customers
- owners
- apartments
- handovers

## 🔐 Environment Variables / متغيرات البيئة

### Production (Vercel):

```
MONGODB_URI=mongodb+srv://raha4rental_db_user:aeu1J7WN@cluster0.njxd43.mongodb.net/apartment_management?retryWrites=true&w=majority
JWT_SECRET=rahaapt-secret-key-2024-xyz789-abc123-def456
NODE_ENV=production
PORT=3000
```

## 📁 بنية المشروع / Project Structure

### الملفات الرئيسية / Main Files:
- `server.js` - الخادم الرئيسي
- `package.json` - التبعيات
- `vercel.json` - إعدادات Vercel
- `.env` - متغيرات البيئة (محلي)

### المجلدات / Directories:
- `public/` - الملفات الثابتة
  - `index.html` - لوحة الإدارة الرئيسية
  - `booking.html` - موقع الحجز
  - `admin.html` - لوحة الإدارة الجديدة
  - `index-modern.html` - الموقع الحديث
- `routes/` - مسارات API
- `models/` - نماذج قاعدة البيانات
- `middleware/` - Middleware

## 🔗 الروابط المهمة / Important Links

### الموقع / Website:
- **الصفحة الرئيسية:** https://rahaapt.com/
- **موقع الحجز:** https://rahaapt.com/booking.html
- **لوحة الإدارة:** https://rahaapt.com/admin.html
- **الموقع الحديث:** https://rahaapt.com/index-modern.html

### API:
- **Base URL:** https://rahaapt.com/api
- **API Info:** https://rahaapt.com/api

### Dashboards:
- **Vercel:** https://vercel.com/dashboard
- **Cloudflare:** https://dash.cloudflare.com
- **MongoDB Atlas:** https://cloud.mongodb.com

## 📝 DNS Configuration / إعدادات DNS

### Cloudflare DNS Records:

#### لـ rahaapt.com (Root):
```
Type: A (أو CNAME حسب Vercel)
Name: @
Content/Target: [من Vercel]
Proxy: Off (رمادي)
TTL: Auto
```

#### لـ www.rahaapt.com:
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy: Off (رمادي)
TTL: Auto
```

### Verification Record (TXT):
```
Type: TXT
Name: @
Content: vc-domain-verify=rahaapt.com,dcf87ff1a50060999ab5
TTL: Auto
```

## 🔑 API Endpoints / نقاط النهاية

### Authentication / المصادقة:
- `POST /api/auth/customer/register` - تسجيل عميل
- `POST /api/auth/customer/login` - تسجيل دخول عميل
- `POST /api/auth/owner/register` - تسجيل مالك
- `POST /api/auth/owner/login` - تسجيل دخول مالك

### Apartments / الشقق:
- `GET /api/apartments` - الحصول على جميع الشقق
- `GET /api/apartments/:id` - الحصول على شقة واحدة
- `POST /api/apartments` - إنشاء شقة جديدة
- `PUT /api/apartments/:id` - تحديث شقة
- `DELETE /api/apartments/:id` - حذف شقة

### Customers / العملاء:
- `GET /api/customers` - الحصول على العملاء
- `GET /api/customers/profile` - معلومات العميل
- `GET /api/customers/search-apartments` - البحث عن الشقق
- `POST /api/customers/request-rental/:apartmentId` - طلب إيجار

### Owners / الملاك:
- `GET /api/owners/profile` - معلومات المالك
- `GET /api/owners/apartments` - شقق المالك
- `GET /api/owners/rental-requests` - طلبات الإيجار

### Handover / التسليم:
- `GET /api/handover` - الحصول على التسليمات
- `POST /api/handover` - إنشاء تسليم جديد

## 🛠️ التقنيات المستخدمة / Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Validation:** Express-validator
- **Security:** bcryptjs
- **Deployment:** Vercel
- **Domain:** Cloudflare
- **Frontend:** HTML, CSS, JavaScript, Tailwind CSS

## 📦 التبعيات / Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "multer": "^1.4.5-lts.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.1",
  "cloudinary": "^1.40.0"
}
```

## 🔒 الأمان / Security

- ✅ كلمات المرور مشفرة بـ bcryptjs
- ✅ JWT للمصادقة
- ✅ SSL Certificate تلقائي من Vercel
- ✅ CORS مفعل
- ✅ Validation للبيانات

## 📊 الميزات / Features

### للعملاء / For Customers:
- ✅ تسجيل حساب جديد
- ✅ البحث عن الشقق
- ✅ طلب استئجار شقة
- ✅ إدارة الشقق المستأجرة
- ✅ رفع صور الهوية

### للملاك / For Owners:
- ✅ تسجيل حساب جديد
- ✅ إضافة شقق جديدة
- ✅ إدارة طلبات الإيجار
- ✅ رفع صور الشقق
- ✅ إدارة الأثاث والأجهزة

### نظام التسليم / Handover System:
- ✅ تسليم أولي ونهائي
- ✅ فحص الأثاث والأجهزة
- ✅ فحص المرافق
- ✅ إدارة المفاتيح
- ✅ نظام التوقيعات

## 🚀 أوامر مهمة / Important Commands

### التطوير المحلي / Local Development:
```bash
npm install          # تثبيت التبعيات
npm run dev          # تشغيل في وضع التطوير
npm start            # تشغيل للإنتاج
```

### النشر / Deployment:
```bash
vercel login         # تسجيل الدخول
vercel --prod        # النشر للإنتاج
vercel link          # ربط المشروع
```

### قاعدة البيانات / Database:
```bash
npm run seed         # إضافة بيانات تجريبية
npm run check-db     # التحقق من قاعدة البيانات
```

## 📝 ملاحظات مهمة / Important Notes

1. **Environment Variables:**
   - محفوظة في Vercel Dashboard
   - لا ترفع `.env` إلى GitHub

2. **MongoDB Atlas:**
   - Network Access: `0.0.0.0/0` (Allow from anywhere)
   - Database: `apartment_management`

3. **DNS:**
   - Cloudflare Proxy: Off (مهم!)
   - SSL: تلقائي من Vercel

4. **التحديثات:**
   - Push إلى GitHub = نشر تلقائي على Vercel
   - إذا كان مربوطاً

## 🔄 معلومات Git / Git Information

### Repository:
```
raha4rental/mangment-Dashboard
```

### Branch:
```
main
```

### Last Commit:
```
Update vercel.json to fix 404 error
```

## 📞 الدعم / Support

### Documentation Files:
- `README.md` - دليل المشروع
- `DEPLOY.md` - تعليمات النشر
- `QUICK_START.md` - دليل البدء السريع
- `FINAL_SUCCESS.md` - ملخص النجاح

### Useful Links:
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Cloudflare Docs: https://developers.cloudflare.com

---

**تاريخ الإنشاء / Created:** 14 فبراير 2025  
**آخر تحديث / Last Updated:** 14 فبراير 2025
