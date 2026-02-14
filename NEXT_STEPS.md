# الخطوات التالية بعد ربط MongoDB / Next Steps After Linking MongoDB

## ✅ ما تم إنجازه / What's Done

- ✅ MongoDB URI مضاف في Vercel
- ✅ Environment Variables جاهزة
- ✅ المشروع جاهز للنشر

## 🚀 الخطوات التالية / Next Steps

### الخطوة 1: إضافة النطاق في Vercel / Add Domain to Vercel

1. **في Vercel Dashboard:**
   - اختر المشروع
   - Settings > Domains
   - Add Domain

2. **أضف النطاق:**
   - `rahaapt.com`
   - `www.rahaapt.com`

3. **Vercel سيعطيك DNS records:**
   - اكتبها أو التقط صورة
   - ستحتاجها للخطوة التالية

### الخطوة 2: إعداد DNS في Cloudflare / Setup DNS in Cloudflare

1. **سجل الدخول إلى Cloudflare:**
   - https://dash.cloudflare.com
   - اختر النطاق `rahaapt.com`

2. **اذهب إلى DNS:**
   - Dashboard > DNS > Records

3. **احذف السجلات الافتراضية (إن وجدت)**

4. **أضف السجلات من Vercel:**

   **إذا أعطاك Vercel A Record:**
   ```
   Type: A
   Name: @
   Content: [IP من Vercel]
   Proxy: Off (رمادي)
   TTL: Auto
   ```

   **إذا أعطاك Vercel CNAME:**
   ```
   Type: CNAME
   Name: @
   Target: [من Vercel]
   Proxy: Off (رمادي)
   TTL: Auto
   ```

   **لـ www:**
   ```
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   Proxy: Off (رمادي)
   TTL: Auto
   ```

5. **مهم جداً:**
   - ⚠️ Proxy يجب أن يكون **Off** (رمادي)
   - ⚠️ ليس **On** (برتقالي)
   - هذا ضروري ليعمل Vercel بشكل صحيح

### الخطوة 3: الانتظار / Wait

- **DNS Propagation:** 5 دقائق إلى 48 ساعة
- **SSL Certificate:** تلقائي من Vercel (بضع دقائق)

### الخطوة 4: التحقق / Verification

بعد 5-10 دقائق، تحقق من:

- ✅ https://rahaapt.com
- ✅ https://www.rahaapt.com
- ✅ https://rahaapt.com/booking.html
- ✅ https://rahaapt.com/admin.html
- ✅ https://rahaapt.com/ (صفحة الإدارة الرئيسية)

## استكشاف الأخطاء / Troubleshooting

### النطاق لا يعمل بعد 10 دقائق

1. **تحقق من DNS:**
   - استخدم: https://dnschecker.org
   - ابحث عن `rahaapt.com`
   - تحقق من أن السجلات صحيحة

2. **تحقق من Cloudflare Proxy:**
   - يجب أن يكون **Off** (رمادي)
   - إذا كان **On** (برتقالي)، أغلقه

3. **تحقق من Vercel:**
   - Settings > Domains
   - تأكد من أن النطاق "Valid"

### خطأ SSL

- Vercel يوفر SSL تلقائياً
- انتظر 5-10 دقائق
- إذا استمر، تحقق من DNS

### خطأ 404

- تأكد من أن `vercel.json` محدث
- أعد النشر: `vercel --prod`

### خطأ في الاتصال بقاعدة البيانات

1. **تحقق من MongoDB Atlas Network Access:**
   - اذهب إلى: https://cloud.mongodb.com
   - Network Access
   - تأكد من وجود: `0.0.0.0/0`

2. **تحقق من Environment Variables:**
   - في Vercel Dashboard
   - Settings > Environment Variables
   - تأكد من أن `MONGODB_URI` صحيح

## ملخص سريع / Quick Summary

1. ✅ **MongoDB مربوط** (تم ✅)
2. ⏳ **إضافة النطاق في Vercel** (الآن)
3. ⏳ **إعداد DNS في Cloudflare** (بعد الخطوة 2)
4. ⏳ **الانتظار 5-10 دقائق**
5. ✅ **الموقع جاهز!**

## روابط مفيدة / Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Cloudflare Dashboard: https://dash.cloudflare.com
- MongoDB Atlas: https://cloud.mongodb.com
- DNS Checker: https://dnschecker.org
