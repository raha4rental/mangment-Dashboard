# معلومات MongoDB Backup / MongoDB Backup Information

## معلومات الاتصال / Connection Information

### MongoDB URI:
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

## Backup Commands / أوامر النسخ الاحتياطي

### 1. Backup كامل / Full Backup

```bash
mongodump --uri "mongodb+srv://raha4rental_db_user:aeu1J7WN@cluster0.njxd43.mongodb.net/apartment_management?retryWrites=true&w=majority" --out ./backup
```

### 2. Backup Collection محدد / Specific Collection

```bash
# Backup customers
mongodump --uri "mongodb+srv://raha4rental_db_user:aeu1J7WN@cluster0.njxd43.mongodb.net/apartment_management?retryWrites=true&w=majority" --collection=customers --out ./backup

# Backup apartments
mongodump --uri "mongodb+srv://raha4rental_db_user:aeu1J7WN@cluster0.njxd43.mongodb.net/apartment_management?retryWrites=true&w=majority" --collection=apartments --out ./backup
```

### 3. Restore / استعادة

```bash
mongorestore --uri "mongodb+srv://raha4rental_db_user:aeu1J7WN@cluster0.njxd43.mongodb.net/apartment_management?retryWrites=true&w=majority" ./backup/apartment_management
```

## Collections / المجموعات

### Collections الموجودة:
- `customers` - العملاء
- `owners` - الملاك
- `apartments` - الشقق
- `handovers` - التسليمات

## ملاحظات / Notes

1. **البيانات موجودة في MongoDB Atlas:**
   - ✅ آمنة ومحمية
   - ✅ نسخ احتياطي تلقائي
   - ✅ يمكن الوصول إليها من أي مكان

2. **Backup منتظم:**
   - MongoDB Atlas يقوم بـ backup تلقائي
   - يمكنك عمل backup يدوي عند الحاجة

3. **الأمان:**
   - ⚠️ لا تشارك MongoDB URI علناً
   - ✅ استخدم Environment Variables في Vercel
