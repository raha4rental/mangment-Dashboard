# Environment Variables النهائية لـ Vercel / Final Vercel Environment Variables

## ✅ MongoDB URI المحدث / Updated MongoDB URI

### القيمة الصحيحة / Correct Value:

**Name:** `MONGODB_URI`

**Value:**
```
mongodb+srv://raha4rental_db_user:aeui1J7WN@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0
```

**ملاحظات:**
- ✅ أزلت `< >` من كلمة المرور
- ✅ أضفت `/rahateam` كاسم قاعدة البيانات
- ⚠️ إذا كان اسم قاعدة البيانات مختلف، استبدله

## جميع Environment Variables / All Environment Variables

### 1. MONGODB_URI

**Name:** `MONGODB_URI`

**Value:**
```
mongodb+srv://raha4rental_db_user:aeui1J7WN@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0
```

**Environment:** ✅ Production, ✅ Preview, ✅ Development

### 2. JWT_SECRET

**Name:** `JWT_SECRET`

**Value:**
```
rahaapt-secret-key-2024-xyz789-abc123-def456
```

**Environment:** ✅ Production, ✅ Preview, ✅ Development

### 3. NODE_ENV

**Name:** `NODE_ENV`

**Value:**
```
production
```

**Environment:** ✅ Production, ✅ Preview, ✅ Development

### 4. PORT

**Name:** `PORT`

**Value:**
```
3000
```

**Environment:** ✅ Production, ✅ Preview, ✅ Development

## كيفية الإضافة في Vercel / How to Add in Vercel

### في صفحة Environment Variables:

1. **MONGODB_URI:**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://raha4rental_db_user:aeui1J7WN@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0`
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

### 1. اسم قاعدة البيانات / Database Name

إذا كان اسم قاعدة البيانات ليس `rahateam`، استبدله بـ:
- `apartment_management`
- `raha4rental`
- أو أي اسم آخر تجده في MongoDB Atlas

**للتحقق:**
1. اذهب إلى: https://cloud.mongodb.com
2. Cluster0 > Browse Collections
3. ستجد اسم قاعدة البيانات

### 2. MongoDB Atlas Network Access

**مهم جداً:**
1. اذهب إلى: MongoDB Atlas > Network Access
2. تأكد من وجود: `0.0.0.0/0` (Allow from anywhere)
3. إذا لم يكن موجوداً:
   - Add IP Address
   - IP Address: `0.0.0.0/0`
   - Comment: "Vercel"

### 3. كلمة المرور

- ✅ كلمة المرور: `aeui1J7WN` (بدون `< >`)
- ⚠️ لا تشاركها علناً

## التحقق / Verification

بعد إضافة جميع المتغيرات:

1. ✅ احفظ التغييرات
2. ✅ انتظر إعادة النشر (1-2 دقيقة)
3. ✅ تحقق من أن الموقع يعمل
4. ✅ تحقق من الاتصال بقاعدة البيانات

## إذا واجهت مشكلة / If You Encounter Issues

### خطأ في الاتصال بقاعدة البيانات:

1. **تحقق من Network Access:**
   - MongoDB Atlas > Network Access
   - تأكد من `0.0.0.0/0`

2. **تحقق من اسم قاعدة البيانات:**
   - استخدم الاسم الصحيح

3. **تحقق من كلمة المرور:**
   - بدون `< >`
   - تأكد من أنها صحيحة

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
