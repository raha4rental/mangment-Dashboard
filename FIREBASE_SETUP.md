# إعداد Firebase / Firebase Setup

## معلومات Firebase / Firebase Information

### إذا كنت تريد استخدام Firebase:

#### Firebase Hosting (بديل لـ Vercel):
- يمكنك نشر الموقع على Firebase Hosting
- أو استخدام Firebase Functions للـ API

#### Firebase Firestore (بديل لـ MongoDB):
- يمكنك استخدام Firestore بدلاً من MongoDB
- يحتاج تعديل في الكود

## خطوات إعداد Firebase / Firebase Setup Steps

### 1. إنشاء مشروع Firebase

1. اذهب إلى: https://console.firebase.google.com
2. Add Project
3. أدخل اسم المشروع: `rahaapt` أو `rahateam`
4. اتبع التعليمات

### 2. Firebase Hosting

```bash
# تثبيت Firebase CLI
npm install -g firebase-tools

# تسجيل الدخول
firebase login

# تهيئة المشروع
firebase init hosting

# النشر
firebase deploy --only hosting
```

### 3. Firebase Firestore (إذا أردت)

1. في Firebase Console
2. Firestore Database > Create Database
3. ابدأ في Test Mode
4. اختر Location

### 4. Environment Variables في Firebase

في Firebase Functions:
```javascript
// functions/.env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret
```

## ملاحظات / Notes

- **حالياً:** المشروع يستخدم Vercel (يعمل بشكل ممتاز ✅)
- **Firebase:** اختياري، يمكن إضافته لاحقاً
- **MongoDB:** البيانات موجودة في MongoDB Atlas ✅

## التوصية / Recommendation

**الوضع الحالي مثالي:**
- ✅ Vercel للنشر (أسرع وأسهل)
- ✅ MongoDB Atlas لقاعدة البيانات (قوية وموثوقة)
- ✅ Cloudflare للنطاق (أرخص وأسرع)

**Firebase يمكن إضافته لاحقاً إذا احتجت:**
- Firebase Analytics
- Firebase Authentication (بديل لـ JWT)
- Firebase Storage (لرفع الصور)
