# التحقق من النطاق في Vercel / Vercel Domain Verification

## كود التحقق / Verification Code

```
vc-domain-verify=rahaapt.com,dcf87ff1a50060999ab5
```

## الخطوات الكاملة / Complete Steps

### الخطوة 1: إضافة TXT Record في Cloudflare

1. **سجل الدخول إلى Cloudflare:**
   - https://dash.cloudflare.com
   - اختر النطاق `rahaapt.com`

2. **اذهب إلى DNS:**
   - Dashboard > DNS > Records

3. **Add Record:**
   - اضغط "Add record"

4. **أدخل المعلومات:**
   ```
   Type: TXT
   Name: @ (أو اتركه فارغاً)
   Content: vc-domain-verify=rahaapt.com,dcf87ff1a50060999ab5
   TTL: Auto
   Proxy: Off (لا يهم لـ TXT records)
   ```

5. **احفظ:**
   - اضغط "Save"

### الخطوة 2: التحقق في Vercel

1. **ارجع إلى Vercel Dashboard:**
   - https://vercel.com/dashboard
   - اختر المشروع
   - Settings > Domains

2. **التحقق:**
   - Vercel سيتحقق تلقائياً
   - أو اضغط "Verify" / "Continue"
   - قد يستغرق بضع دقائق

### الخطوة 3: إضافة DNS Records بعد التحقق

بعد التحقق الناجح، Vercel سيعطيك DNS records للإضافة:

**عادة ما تكون:**

**لـ rahaapt.com (Root):**
```
Type: A
Name: @
Content: 76.76.21.21 (أو IP من Vercel)
Proxy: Off (رمادي)
TTL: Auto
```

**أو:**
```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
Proxy: Off (رمادي)
TTL: Auto
```

**لـ www.rahaapt.com:**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy: Off (رمادي)
TTL: Auto
```

## ملاحظات مهمة / Important Notes

1. **TXT Record:**
   - يستخدم فقط للتحقق
   - يمكنك حذفه بعد التحقق الناجح (اختياري)

2. **Proxy:**
   - لـ A/CNAME records: يجب أن يكون **Off** (رمادي)
   - لـ TXT records: لا يهم

3. **الوقت:**
   - التحقق: بضع دقائق
   - DNS Propagation: 5-10 دقائق

## استكشاف الأخطاء / Troubleshooting

### التحقق فشل

1. **تحقق من TXT Record:**
   - تأكد من أن القيمة صحيحة بالضبط
   - بدون مسافات إضافية
   - `vc-domain-verify=rahaapt.com,dcf87ff1a50060999ab5`

2. **انتظر بضع دقائق:**
   - DNS قد يستغرق وقتاً

3. **تحقق من DNS:**
   - استخدم: https://dnschecker.org
   - ابحث عن TXT records لـ `rahaapt.com`

### بعد التحقق، النطاق لا يعمل

1. **تحقق من DNS Records:**
   - تأكد من إضافة A/CNAME records من Vercel
   - تأكد من Proxy: Off

2. **انتظر 5-10 دقائق:**
   - DNS Propagation

## الخطوات التالية بعد التحقق / Next Steps After Verification

1. ✅ **إضافة DNS Records:**
   - A أو CNAME records من Vercel

2. ✅ **الانتظار:**
   - 5-10 دقائق

3. ✅ **التحقق:**
   - https://rahaapt.com
   - https://www.rahaapt.com

## روابط مفيدة / Useful Links

- Cloudflare Dashboard: https://dash.cloudflare.com
- Vercel Dashboard: https://vercel.com/dashboard
- DNS Checker: https://dnschecker.org
