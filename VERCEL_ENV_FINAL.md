# Environment Variables النهائية لـ Vercel / Final Vercel Environment Variables

## ✅ MongoDB URI النهائي / Final MongoDB URI

### القيمة الصحيحة / Correct Value:

**Name:** `MONGODB_URI`

**Value:**
```
mongodb+srv://raha4rental_db_user:aeu1J7WN@cluster0.njxd43.mongodb.net/apartment_management?retryWrites=true&w=majority
```

**✅ اسم قاعدة البيانات:** `apartment_management`

## جميع Environment Variables / All Environment Variables

### 1. MONGODB_URI ✅

**Name:** `MONGODB_URI`

**Value:**
```
mongodb+srv://raha4rental_db_user:aeu1J7WN@cluster0.njxd43.mongodb.net/apartment_management?retryWrites=true&w=majority
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
   - Value: `mongodb+srv://raha4rental_db_user:aeu1J7WN@cluster0.njxd43.mongodb.net/apartment_management?retryWrites=true&w=majority`
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

### 1. MongoDB Atlas Network Access

**مهم جداً:**
1. اذهب إلى: https://cloud.mongodb.com
2. Network Access
3. تأكد من وجود: `0.0.0.0/0` (Allow from anywhere)
4. إذا لم يكن موجوداً:
   - Add IP Address
   - IP Address: `0.0.0.0/0`
   - Comment: "Vercel"

### 2. اسم قاعدة البيانات

✅ **تم التأكد:** `apartment_management`

### 3. كلمة المرور

✅ **كلمة المرور:** `aeu1J7WN`
⚠️ لا تشاركها علناً

## التحقق / Verification

بعد إضافة جميع المتغيرات:

1. ✅ احفظ التغييرات
2. ✅ انتظر إعادة النشر (1-2 دقيقة)
3. ✅ تحقق من أن الموقع يعمل
4. ✅ تحقق من الاتصال بقاعدة البيانات

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

## روابط مفيدة / Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- Cloudflare Dashboard: https://dash.cloudflare.com
