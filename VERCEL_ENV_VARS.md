# Environment Variables لـ Vercel / Vercel Environment Variables

## المتغيرات المطلوبة / Required Variables

### 1. MONGODB_URI (مطلوب) / (Required)

**القيمة / Value:**
```
mongodb+srv://username:password@cluster.mongodb.net/database-name
```

**أو إذا كنت تستخدم MongoDB محلي:**
```
mongodb://localhost:27017/apartment_management
```

**كيفية الحصول عليه / How to get it:**
- إذا كنت تستخدم MongoDB Atlas:
  1. اذهب إلى: https://www.mongodb.com/cloud/atlas
  2. Cluster > Connect > Connect your application
  3. انسخ Connection String
  4. استبدل `<password>` بكلمة المرور

- إذا كنت تستخدم MongoDB محلي:
  - استخدم: `mongodb://localhost:27017/apartment_management`

### 2. JWT_SECRET (مطلوب) / (Required)

**القيمة / Value:**
```
any-random-secret-key-12345-abcdef
```

**مثال / Example:**
```
rahaapt-secret-key-2024-xyz789
```

**ملاحظة:** يمكنك استخدام أي نص عشوائي طويل

### 3. NODE_ENV (مطلوب) / (Required)

**القيمة / Value:**
```
production
```

### 4. PORT (اختياري) / (Optional)

**القيمة / Value:**
```
3000
```

**ملاحظة:** Vercel يستخدم PORT تلقائياً، لكن يمكنك إضافته

## كيفية الإضافة في Vercel / How to Add in Vercel

### في صفحة Environment Variables:

1. **Name:** `MONGODB_URI`
   **Value:** `mongodb+srv://...` (رابط MongoDB الخاص بك)

2. **Name:** `JWT_SECRET`
   **Value:** `any-random-secret-key-12345`

3. **Name:** `NODE_ENV`
   **Value:** `production`

4. **Name:** `PORT`
   **Value:** `3000`

### Environment (اختر):
- ✅ **Production** (للنشر النهائي)
- ✅ **Preview** (للمعاينة)
- ✅ **Development** (للتطوير)

**موصى به:** اختر جميعها (Production, Preview, Development)

## مثال كامل / Complete Example

```
MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/rahateam
JWT_SECRET = rahaapt-secret-key-2024-xyz789-abc123
NODE_ENV = production
PORT = 3000
```

## ملاحظات مهمة / Important Notes

1. **MONGODB_URI:**
   - تأكد من أن MongoDB Atlas يسمح بالاتصال من أي IP
   - أو أضف IP Vercel في Network Access

2. **JWT_SECRET:**
   - استخدم نص عشوائي طويل
   - لا تشاركه مع أحد
   - مهم للأمان

3. **NODE_ENV:**
   - يجب أن يكون `production` للإنتاج

4. **بعد الإضافة:**
   - احفظ التغييرات
   - Vercel سيعيد النشر تلقائياً
   - أو انقر "Redeploy"

## إذا لم يكن لديك MongoDB Atlas:

### إنشاء حساب مجاني:

1. اذهب إلى: https://www.mongodb.com/cloud/atlas
2. Sign Up (مجاني)
3. أنشئ Cluster (مجاني)
4. احصل على Connection String
5. استخدمه في `MONGODB_URI`

## التحقق / Verification

بعد إضافة جميع المتغيرات:
- ✅ احفظ التغييرات
- ✅ انتظر إعادة النشر
- ✅ تحقق من أن الموقع يعمل
