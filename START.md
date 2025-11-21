# 🚀 دليل البدء السريع - Quick Start Guide

## 📋 البدء في الاستخدام المحلي - Local Setup

### 1. تشغيل المشروع محلياً

```bash
# التأكد من تثبيت الحزم
npm install

# تشغيل الخادم
npm start
```

الموقع سيكون متاحاً على: **http://localhost:5000**

### 2. متغيرات البيئة (Environment Variables)

أنشئ ملف `.env` في المجلد الرئيسي:

```env
MONGODB_URI=mongodb://localhost:27017/apartment_management
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=development
```

---

## 🌐 النشر على الإنترنت - Deploy Online

### ✅ الطريقة 1: Vercel (الأسهل والأسرع) - Recommended

#### الخطوات:

1. **الذهاب إلى [Vercel.com](https://vercel.com)**
   - سجل دخول بحساب GitHub

2. **ربط المستودع:**
   - اضغط "New Project"
   - اختر المستودع: `raha4rental/mangment-Dashboard`
   - Vercel سيكتشف الإعدادات تلقائياً

3. **إضافة متغيرات البيئة:**
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=5000
   NODE_ENV=production
   ```

4. **Deploy:**
   - اضغط "Deploy"
   - انتظر حتى ينتهي النشر (1-2 دقيقة)

5. **الموقع جاهز!**
   - ستحصل على رابط مثل: `mangment-dashboard.vercel.app`

---

### ✅ الطريقة 2: Railway

1. **الذهاب إلى [Railway.app](https://railway.app)**
   - سجل دخول بحساب GitHub

2. **New Project → Deploy from GitHub repo**
   - اختر المستودع: `raha4rental/mangment-Dashboard`

3. **إضافة متغيرات البيئة:**
   - في Settings → Variables
   - أضف نفس المتغيرات من Vercel

4. **الموقع سيعمل تلقائياً!**

---

### ✅ الطريقة 3: Render

1. **الذهاب إلى [Render.com](https://render.com)**
   - سجل دخول بحساب GitHub

2. **New → Web Service**
   - ربط المستودع
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **إضافة متغيرات البيئة**

4. **Deploy!**

---

## 🗄️ قاعدة البيانات - Database Setup

### خيار 1: MongoDB Atlas (مجاني للأغراض التعليمية)

1. **سجل في [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**
2. **أنشئ Cluster مجاني**
3. **انسخ Connection String**
4. **أضفه في `.env` كـ `MONGODB_URI`**

### خيار 2: MongoDB محلي

```bash
# تثبيت MongoDB محلياً (macOS)
brew install mongodb-community

# تشغيل MongoDB
brew services start mongodb-community
```

---

## 📱 البدء في الاستخدام - Start Using

### 1. افتح الموقع:
- محلي: `http://localhost:5000`
- أو الرابط من Vercel/Railway

### 2. تسجيل الدخول:
- استخدم أي بريد إلكتروني وكلمة مرور (حالياً)
- النظام سيدعم المصادقة الكاملة قريباً

### 3. استكشف الميزات:
- 📊 **اللوحة الرئيسية**: نظرة عامة على الحالة
- 🏢 **المباني والشقق**: إدارة المباني والشقق مع الصور
- 🔧 **الصيانة**: إدارة طلبات الصيانة
- 🧹 **التنظيف**: جدول المهام الشامل
- 📅 **التقويم**: إدارة المهام والأحداث
- 📦 **المستلزمات**: جرد المستلزمات
- 🧾 **الفواتير**: إدارة الفواتير
- 📈 **التقارير**: التقارير والإحصائيات

---

## ✨ الميزات الجديدة المضافة

✅ **تقويم كامل** مع إمكانية إضافة مهام
✅ **نظام مهام تنظيف شامل** مع قوائم فحص تفصيلية
✅ **رفع صور للمباني** - كل مبنى يمكن أن يحتوي على صور متعددة
✅ **إضافة مباني جديدة** للمستقبل
✅ **رفع 12 صورة لكل شقة** عند إضافتها
✅ **عمارة سكاي** تم إضافتها

---

## 🔧 حل المشاكل الشائعة - Troubleshooting

### المشكلة: MongoDB غير متصل
**الحل:** 
- تأكد من تشغيل MongoDB محلياً
- أو استخدم MongoDB Atlas مع Connection String صحيح

### المشكلة: الموقع لا يعمل
**الحل:**
```bash
# تأكد من تثبيت الحزم
npm install

# تأكد من تشغيل الخادم
npm start
```

### المشكلة: الصور لا تظهر
**الحل:**
- تأكد من وجود مجلد `uploads/` في المشروع
- الصور محفوظة محلياً في `localStorage` (للتطوير)

---

## 📞 الدعم

للمزيد من المساعدة:
- راجع الملفات في المجلد
- `DEPLOY.md` - تعليمات النشر التفصيلية
- `QUICK_DEPLOY.md` - نشر سريع على Vercel

---

## 🎉 جاهز للاستخدام!

المشروع جاهز الآن للاستخدام والنشر. اختر الطريقة التي تفضلها للنشر وابدأ في استخدام النظام!

**Good luck! 🚀**

