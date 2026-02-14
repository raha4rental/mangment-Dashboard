# إضافة www.rahaapt.com / Add www.rahaapt.com

## الخطوات الكاملة / Complete Steps

### الخطوة 1: إضافة النطاق في Vercel / Add Domain in Vercel

1. **اذهب إلى Vercel Dashboard:**
   - https://vercel.com/dashboard
   - اختر المشروع

2. **إضافة النطاق:**
   - Settings > Domains
   - Add Domain
   - أدخل: `www.rahaapt.com`
   - اضغط "Add"

3. **Vercel سيعطيك DNS record:**
   - عادة CNAME: `cname.vercel-dns.com`
   - أو IP address

### الخطوة 2: إعداد DNS في Cloudflare / Setup DNS in Cloudflare

1. **سجل الدخول إلى Cloudflare:**
   - https://dash.cloudflare.com
   - اختر النطاق `rahaapt.com`

2. **اذهب إلى DNS:**
   - Dashboard > DNS > Records

3. **Add Record:**

   **إذا أعطاك Vercel CNAME:**
   ```
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   Proxy: Off (رمادي - مهم جداً!)
   TTL: Auto
   ```

   **إذا أعطاك Vercel IP Address:**
   ```
   Type: A
   Name: www
   Content: [IP من Vercel]
   Proxy: Off (رمادي - مهم جداً!)
   TTL: Auto
   ```

4. **مهم جداً:**
   - ⚠️ Proxy يجب أن يكون **Off** (رمادي)
   - ⚠️ ليس **On** (برتقالي)
   - هذا ضروري ليعمل Vercel بشكل صحيح

5. **احفظ:**
   - اضغط "Save"

### الخطوة 3: الانتظار / Wait

- **DNS Propagation:** 5 دقائق إلى 48 ساعة
- **عادة:** 5-10 دقائق
- **SSL Certificate:** تلقائي من Vercel (بضع دقائق)

### الخطوة 4: التحقق / Verification

بعد 5-10 دقائق، تحقق من:

- ✅ https://www.rahaapt.com
- ✅ https://www.rahaapt.com/booking.html
- ✅ https://www.rahaapt.com/admin.html

## DNS Records الكاملة / Complete DNS Records

بعد إضافة www، يجب أن يكون لديك:

### لـ rahaapt.com (Root):
```
Type: A (أو CNAME)
Name: @
Content/Target: [من Vercel]
Proxy: Off
```

### لـ www.rahaapt.com:
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy: Off
```

## استكشاف الأخطاء / Troubleshooting

### www.rahaapt.com لا يعمل

1. **تحقق من DNS:**
   - استخدم: https://dnschecker.org
   - ابحث عن `www.rahaapt.com`
   - تحقق من أن السجلات صحيحة

2. **تحقق من Cloudflare Proxy:**
   - يجب أن يكون **Off** (رمادي)
   - إذا كان **On** (برتقالي)، أغلقه

3. **تحقق من Vercel:**
   - Settings > Domains
   - تأكد من أن `www.rahaapt.com` "Valid"

### خطأ SSL

- Vercel يوفر SSL تلقائياً
- انتظر 5-10 دقائق
- إذا استمر، تحقق من DNS

## ملاحظات مهمة / Important Notes

1. **Cloudflare Proxy:**
   - يجب أن يكون **Off** لجميع A/CNAME records
   - هذا ضروري لـ Vercel

2. **DNS Propagation:**
   - قد يستغرق وقتاً
   - استخدم dnschecker.org للتحقق

3. **SSL Certificate:**
   - Vercel يوفر SSL تلقائياً
   - مجاني تماماً

## التحقق السريع / Quick Check

```bash
# تحقق من DNS
dig www.rahaapt.com

# أو استخدم
nslookup www.rahaapt.com
```

## روابط مفيدة / Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Cloudflare Dashboard: https://dash.cloudflare.com
- DNS Checker: https://dnschecker.org
