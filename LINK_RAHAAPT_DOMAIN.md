# ربط النطاق rahaapt.com / Link rahaapt.com Domain

## الوضع الحالي / Current Status
✅ الموقع يعمل على نطاق Vercel المجاني / Website works on Vercel free domain
⏳ النطاق المخصص rahaapt.com غير مربوط / Custom domain rahaapt.com not linked

## الخطوات الكاملة / Complete Steps

### الخطوة 1: إضافة النطاق في Vercel / Add Domain in Vercel

1. **اذهب إلى Vercel Dashboard:**
   - https://vercel.com/dashboard
   - اختر المشروع

2. **إضافة النطاق:**
   - Settings > Domains
   - Add Domain
   - أدخل: `rahaapt.com`
   - اضغط "Add"

3. **Vercel سيعطيك DNS records:**
   - اكتبها أو التقط صورة
   - ستحتاجها للخطوة التالية

**مثال على ما سيعطيك Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### الخطوة 2: إعداد DNS في Cloudflare / Setup DNS in Cloudflare

1. **سجل الدخول إلى Cloudflare:**
   - https://dash.cloudflare.com
   - اختر النطاق `rahaapt.com`

2. **اذهب إلى DNS:**
   - Dashboard > DNS > Records

3. **احذف السجلات الافتراضية (إن وجدت):**
   - احذف أي A records أو CNAME records موجودة

4. **أضف السجلات من Vercel:**

   **لـ rahaapt.com (Root domain):**
   
   **إذا أعطاك Vercel A Record:**
   ```
   Type: A
   Name: @
   Content: 76.76.21.21 (أو IP من Vercel)
   Proxy: Off (رمادي - مهم جداً!)
   TTL: Auto
   ```

   **إذا أعطاك Vercel CNAME:**
   ```
   Type: CNAME
   Name: @
   Target: cname.vercel-dns.com (أو من Vercel)
   Proxy: Off (رمادي - مهم جداً!)
   TTL: Auto
   ```

   **لـ www.rahaapt.com:**
   ```
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   Proxy: Off (رمادي - مهم جداً!)
   TTL: Auto
   ```

5. **مهم جداً - Proxy:**
   - ⚠️ يجب أن يكون **Off** (رمادي)
   - ⚠️ ليس **On** (برتقالي)
   - هذا ضروري ليعمل Vercel بشكل صحيح

6. **احفظ التغييرات:**
   - اضغط "Save"

### الخطوة 3: الانتظار / Wait

- **DNS Propagation:** 5 دقائق إلى 48 ساعة
- **عادة:** 5-10 دقائق
- **SSL Certificate:** تلقائي من Vercel (بضع دقائق)

### الخطوة 4: التحقق / Verification

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
   - إذا كان "Invalid"، تحقق من DNS

### خطأ SSL

- Vercel يوفر SSL تلقائياً
- انتظر 5-10 دقائق
- إذا استمر، تحقق من DNS

### خطأ "Domain not configured"

- تحقق من DNS records في Cloudflare
- تأكد من أن Proxy: Off
- انتظر بضع دقائق إضافية

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

## التحقق السريع / Quick Check

```bash
# تحقق من DNS
dig rahaapt.com

# أو استخدم
nslookup rahaapt.com
```

## روابط مفيدة / Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Cloudflare Dashboard: https://dash.cloudflare.com
- DNS Checker: https://dnschecker.org
- Vercel Domains Docs: https://vercel.com/docs/concepts/projects/domains
