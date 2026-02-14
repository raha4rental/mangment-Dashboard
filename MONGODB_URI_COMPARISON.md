# مقارنة MongoDB URIs / MongoDB URI Comparison

## URI 1: السابق (من Cluster0) / Previous (from Cluster0)

```
mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net
```

**المميزات:**
- ✅ Cluster0 (Cluster الرئيسي)
- ✅ المستخدم: raha4rental_db_user
- ✅ يستخدم mongodb+srv:// (أحدث)

**اسم قاعدة البيانات المحتمل:**
- rahateam
- apartment_management
- raha4rental

## URI 2: الجديد (SQL Interface) / New (SQL Interface)

```
mongodb://atlas-sql-6990d8dc181657c5d2977659-c628ad.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin
```

**المميزات:**
- ⚠️ SQL Interface (للاستعلامات فقط)
- ⚠️ اسم قاعدة البيانات: `sample_mflix` (مثال)
- ⚠️ يستخدم mongodb:// (SQL connection)

**ملاحظة:** هذا URI للـ SQL Interface، ليس للاتصال العادي

## أي واحد يجب استخدامه؟ / Which One to Use?

### ✅ استخدم URI 1 (mongodb+srv://) للاتصال العادي:

```
mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0
```

**لماذا؟**
- ✅ للاتصال العادي من التطبيق
- ✅ يدعم جميع العمليات (CRUD)
- ✅ مناسب لـ Node.js/Express

### ⚠️ URI 2 (SQL Interface) للاستعلامات فقط:

```
mongodb://atlas-sql-6990d8dc181657c5d2977659-c628ad.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin
```

**لماذا؟**
- ⚠️ للاستعلامات SQL فقط
- ⚠️ لا يدعم جميع العمليات
- ⚠️ `sample_mflix` هو قاعدة بيانات مثال

## للاستخدام في Vercel / For Use in Vercel

### استخدم URI 1 مع اسم قاعدة البيانات الصحيح:

**Name:** `MONGODB_URI`

**Value:**
```
mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0
```

**أو إذا كان اسم قاعدة البيانات مختلف:**
```
mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/apartment_management?appName=Cluster0
```

## كيفية التحقق من اسم قاعدة البيانات / How to Verify Database Name

### من MongoDB Atlas:

1. اذهب إلى: https://cloud.mongodb.com
2. Cluster0 > Browse Collections
3. ستجد اسم قاعدة البيانات في القائمة

### أو استخدم MongoDB Compass:

1. افتح MongoDB Compass
2. استخدم Connection String:
   ```
   mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net
   ```
3. ستجد جميع قواعد البيانات
4. اختر قاعدة البيانات الصحيحة

## ملاحظات مهمة / Important Notes

1. **URI 1 (mongodb+srv://)** هو الصحيح للاستخدام في التطبيق
2. **URI 2 (SQL Interface)** للاستعلامات SQL فقط، ليس للاتصال العادي
3. **اسم قاعدة البيانات** يجب أن يكون صحيحاً (ليس sample_mflix)
4. **تحقق من MongoDB Atlas** لمعرفة اسم قاعدة البيانات الفعلي

## القيمة النهائية لـ Vercel / Final Value for Vercel

```
mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0
```

**استبدل `rahateam` باسم قاعدة البيانات الفعلي من MongoDB Atlas**
