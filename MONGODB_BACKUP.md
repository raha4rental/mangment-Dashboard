# MongoDB Backup Guide / دليل نسخ احتياطي MongoDB

## معلومات الاتصال / Connection Information

### MongoDB URI:
```
mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net
```

### أسماء قواعد البيانات المحتملة / Possible Database Names:

1. **rahateam** (الأكثر احتمالاً)
2. **apartment_management**
3. **raha4rental**

## كيفية معرفة اسم قاعدة البيانات / How to Find Database Name

### الطريقة 1: من MongoDB Atlas

1. اذهب إلى: https://cloud.mongodb.com
2. سجل الدخول
3. اختر Cluster
4. اضغط "Browse Collections"
5. ستجد اسم قاعدة البيانات في القائمة

### الطريقة 2: من الكود

في ملف `server.js` أو `.env`:
- ابحث عن `MONGODB_URI`
- اسم قاعدة البيانات هو الجزء بعد آخر `/`

## أوامر Backup / Backup Commands

### إذا كان اسم قاعدة البيانات: `rahateam`

```bash
mongodump --uri "mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0"
```

### إذا كان اسم قاعدة البيانات: `apartment_management`

```bash
mongodump --uri "mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/apartment_management?appName=Cluster0"
```

### إذا كان اسم قاعدة البيانات: `raha4rental`

```bash
mongodump --uri "mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/raha4rental?appName=Cluster0"
```

## أوامر Restore / Restore Commands

### Restore قاعدة البيانات:

```bash
mongorestore --uri "mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0" dump/
```

## ملاحظات مهمة / Important Notes

1. **كلمة المرور:**
   - استبدل `<enter_password>` بـ: `PBA4OKG4DlRrTmNU`

2. **اسم قاعدة البيانات:**
   - استبدل `<enter_database_name>` باسم قاعدة البيانات الفعلي

3. **النسخ الاحتياطي:**
   - سيتم حفظ الملفات في مجلد `dump/`
   - يمكنك ضغطها لاحقاً

## للاستخدام في Vercel:

### MONGODB_URI الكامل:

```
mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net/rahateam?appName=Cluster0
```

**ملاحظة:** استبدل `rahateam` باسم قاعدة البيانات الفعلي

## التحقق من قاعدة البيانات / Verify Database

### استخدام MongoDB Compass:

1. افتح MongoDB Compass
2. استخدم Connection String:
   ```
   mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net
   ```
3. ستجد جميع قواعد البيانات
4. اختر قاعدة البيانات الصحيحة

### أو من Terminal:

```bash
mongosh "mongodb+srv://raha4rental_db_user:PBA4OKG4DlRrTmNU@cluster0.nijxd43.mongodb.net"

# بعد الاتصال:
show dbs
use rahateam  # أو اسم قاعدة البيانات الفعلي
show collections
```
