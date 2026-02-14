# إعداد rahaapt.com من Cloudflare / Setup rahaapt.com from Cloudflare

## ✅ النطاق المشترى / Purchased Domain
`rahaapt.com` من Cloudflare / from Cloudflare

## الخطوات الكاملة / Complete Steps

### الخطوة 1: نشر المشروع على Vercel / Deploy to Vercel

#### الطريقة 1: عبر الموقع (الأسهل) ✅

1. **اذهب إلى:**
   - https://vercel.com/new
   - أو: https://vercel.com/dashboard

2. **Import Project:**
   - ابحث عن: `raha4rental/mangment-Dashboard`
   - أو اربط المستودع

3. **الإعدادات:**
   - Framework Preset: **Other**
   - Root Directory: `.`
   - Build Command: (فارغ)
   - Output Directory: (فارغ)

4. **Environment Variables (مهم جداً):**
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key-here
   NODE_ENV=production
   PORT=3000
   ```

5. **Deploy:**
   - اضغط "Deploy"
   - انتظر 1-2 دقيقة

#### الطريقة 2: عبر CLI

```bash
cd /Users/allaasheikh/apartment-management-system

# تسجيل الدخول
vercel login

# ربط المشروع
vercel link

# النشر
vercel --prod
```

### الخطوة 2: إضافة النطاق في Vercel / Add Domain to Vercel

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

### الخطوة 3: إعداد DNS في Cloudflare / Setup DNS in Cloudflare

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
   Proxy: Off (أو Off)
   TTL: Auto
   ```

   **إذا أعطاك Vercel CNAME:**
   ```
   Type: CNAME
   Name: @
   Target: [من Vercel]
   Proxy: Off
   TTL: Auto
   ```

   **لـ www:**
   ```
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   Proxy: Off
   TTL: Auto
   ```

5. **أو استخدم Nameservers من Vercel (إذا كان متاحاً):**
   - في Cloudflare، اذهب إلى Domain Registration
   - غير Nameservers إلى ما أعطاك Vercel

### الخطوة 4: التحقق من الإعدادات / Verify Settings

#### في Cloudflare:
- ✅ DNS Records مضبوطة
- ✅ Proxy: Off (مهم لـ Vercel)

#### في Vercel:
- ✅ النطاق مضاف
- ✅ Environment Variables موجودة
- ✅ المشروع منشور

### الخطوة 5: الانتظار / Wait

- **DNS Propagation:** 5 دقائق إلى 48 ساعة
- **SSL Certificate:** تلقائي من Vercel (بضع دقائق)

### الخطوة 6: التحقق / Verification

بعد 5-10 دقائق، تحقق من:
- ✅ https://rahaapt.com
- ✅ https://www.rahaapt.com
- ✅ https://rahaapt.com/booking.html
- ✅ https://rahaapt.com/admin.html

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

## ملاحظات مهمة / Important Notes

1. **Cloudflare Proxy:**
   - يجب أن يكون **Off** لـ Vercel
   - إذا كان On، قد يسبب مشاكل

2. **DNS Propagation:**
   - قد يستغرق وقتاً
   - استخدم dnschecker.org للتحقق

3. **SSL Certificate:**
   - Vercel يوفر SSL تلقائياً
   - مجاني تماماً

4. **Environment Variables:**
   - تأكد من إضافتها في Vercel
   - مهمة جداً لعمل الموقع

## روابط مفيدة / Useful Links

- Cloudflare Dashboard: https://dash.cloudflare.com
- Vercel Dashboard: https://vercel.com/dashboard
- DNS Checker: https://dnschecker.org
- Vercel Domains Docs: https://vercel.com/docs/concepts/projects/domains

## الخطة السريعة / Quick Plan

1. ✅ **النطاق مشترى** (تم ✅)
2. ⏳ **نشر على Vercel** (الآن)
3. ⏳ **إضافة النطاق في Vercel**
4. ⏳ **إعداد DNS في Cloudflare**
5. ⏳ **الانتظار 5-10 دقائق**
6. ✅ **الموقع جاهز!**
