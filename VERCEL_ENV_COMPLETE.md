# Environment Variables الكاملة لـ Vercel / Complete Vercel Environment Variables

## القيم الجاهزة للإضافة / Ready Values to Add

### 1. MONGODB_URI

**Name:** `MONGODB_URI`

**Value:**
```
mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0
```

**ملاحظة:** أضفت `/rahateam` كاسم قاعدة البيانات. إذا كان لديك اسم آخر، استبدله.

### 2. JWT_SECRET

**Name:** `JWT_SECRET`

**Value:**
```
rahaapt-secret-key-2024-xyz789-abc123-def456
```

أو أي نص عشوائي طويل آخر.

### 3. NODE_ENV

**Name:** `NODE_ENV`

**Value:**
```
production
```

### 4. PORT

**Name:** `PORT`

**Value:**
```
3000
```

## كيفية الإضافة في Vercel / How to Add in Vercel

### في صفحة Environment Variables:

1. **MONGODB_URI:**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0`
   - Environment: ✅ Production, ✅ Preview, ✅ Development

2. **JWT_SECRET:**
   - Name: `JWT_SECRET`
   - Value: `rahaapt-secret-key-2024-xyz789-abc123-def456`
   - Environment: ✅ Production, ✅ Preview, ✅ Development

3. **NODE_ENV:**
   - Name: `NODE_ENV`
   - Value: `production`
   - Environment: ✅ Production, ✅ Preview, ✅ Development

4. **PORT:**
   - Name: `PORT`
   - Value: `3000`
   - Environment: ✅ Production, ✅ Preview, ✅ Development

### بعد الإضافة:
- ✅ احفظ التغييرات (Save)
- ✅ Vercel سيعيد النشر تلقائياً
- ✅ أو اضغط "Redeploy"

## ملاحظات مهمة / Important Notes

1. **MongoDB Atlas Network Access:**
   - تأكد من أن MongoDB Atlas يسمح بالاتصال من أي IP
   - أو أضف IP Vercel في Network Access
   - اذهب إلى: MongoDB Atlas > Network Access > Add IP Address
   - أو: Allow Access from Anywhere (0.0.0.0/0)

2. **اسم قاعدة البيانات:**
   - استخدمت `/rahateam` في الرابط
   - إذا كان لديك اسم آخر، استبدله

3. **الأمان:**
   - لا تشارك MongoDB URI علناً
   - JWT_SECRET يجب أن يكون عشوائياً

## التحقق / Verification

بعد إضافة جميع المتغيرات:
1. ✅ احفظ التغييرات
2. ✅ انتظر إعادة النشر (1-2 دقيقة)
3. ✅ تحقق من أن الموقع يعمل
4. ✅ تحقق من الاتصال بقاعدة البيانات

## إذا واجهت مشكلة في الاتصال:

### تحقق من MongoDB Atlas:

1. **Network Access:**
   - اذهب إلى: MongoDB Atlas > Network Access
   - تأكد من وجود: `0.0.0.0/0` (Allow from anywhere)
   - أو أضف IP Vercel

2. **Database User:**
   - تأكد من أن المستخدم موجود
   - تأكد من الصلاحيات

3. **Connection String:**
   - تأكد من أن الرابط صحيح
   - تأكد من اسم قاعدة البيانات

## الخطوات التالية / Next Steps

بعد إضافة Environment Variables:

1. ✅ **إضافة النطاق:**
   - Settings > Domains
   - Add: `rahaapt.com`
   - Add: `www.rahaapt.com`

2. ✅ **إعداد DNS في Cloudflare:**
   - أضف السجلات من Vercel
   - تأكد من Proxy: Off

3. ✅ **التحقق:**
   - انتظر 5-10 دقائق
   - تحقق من: https://rahaapt.com
