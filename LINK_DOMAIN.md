# ربط rahaadmin.com بالنشر / Link rahaadmin.com to Deployment

## المشكلة / The Problem
المشروع غير مربوط حالياً بـ Vercel محلياً / Project is not currently linked to Vercel locally

## الحل / Solution

### الطريقة 1: عبر Vercel Dashboard (الأسهل) / Via Dashboard (Easiest)

1. **اذهب إلى Vercel Dashboard:**
   - https://vercel.com/dashboard
   - سجل الدخول بحسابك

2. **ابحث عن المشروع أو أنشئ مشروع جديد:**
   - إذا كان المشروع موجود: اختره
   - إذا لم يكن موجود: اضغط "Add New Project"
   - اربط المستودع: `raha4rental/mangment-Dashboard`

3. **إضافة النطاق:**
   - Settings > Domains
   - Add Domain
   - أدخل: `rahaadmin.com`
   - أدخل أيضاً: `www.rahaadmin.com`

4. **إعداد DNS:**
   - Vercel سيعطيك DNS records
   - أضفها في مزود النطاق (GoDaddy, Namecheap, etc.)

### الطريقة 2: عبر Vercel CLI / Via CLI

```bash
cd /Users/allaasheikh/apartment-management-system

# 1. تسجيل الدخول
vercel login

# 2. ربط المشروع (أو إنشاء جديد)
vercel link

# 3. إضافة النطاق
vercel domains add rahaadmin.com
vercel domains add www.rahaadmin.com

# 4. النشر للإنتاج
vercel --prod
```

### إعدادات DNS المطلوبة / Required DNS Settings

#### Option 1: استخدام Vercel Nameservers (موصى به)
```
Type: NS
Name: @
Value: [Nameservers من Vercel]
```

#### Option 2: استخدام A Record
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

## التحقق / Verification

بعد إضافة النطاق (5-10 دقائق):
- ✅ https://rahaadmin.com
- ✅ https://rahaadmin.com/ (صفحة الإدارة الرئيسية)
- ✅ https://rahaadmin.com/booking.html
- ✅ https://rahaadmin.com/admin.html

## ملاحظات مهمة / Important Notes

1. **SSL Certificate**: Vercel يوفر SSL تلقائياً
2. **DNS Propagation**: قد يستغرق من 5 دقائق إلى 48 ساعة
3. **Environment Variables**: تأكد من إضافتها في Vercel Dashboard
4. **المتغيرات المطلوبة:**
   ```
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   PORT=3000
   ```

## استكشاف الأخطاء / Troubleshooting

### النطاق لا يعمل
- تحقق من DNS records: https://dnschecker.org
- انتظر حتى 48 ساعة
- تأكد من إضافة النطاق في Vercel

### خطأ 404
- تأكد من أن `vercel.json` محدث
- أعد النشر: `vercel --prod`

### خطأ SSL
- انتظر بضع دقائق (Vercel يوفر SSL تلقائياً)
