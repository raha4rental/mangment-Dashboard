# دليل شراء النطاق / Domain Purchase Guide

## هل يجب شراء النطاق؟ / Should You Buy Domain?

### ✅ نعم، إذا كنت تريد:
- نطاق احترافي (rahaadmin.com)
- علامة تجارية قوية
- يبدو أكثر احترافية للعملاء

### ⚠️ لا حاجة، إذا:
- تريد البدء بسرعة
- الميزانية محدودة
- يمكنك الشراء لاحقاً

## أفضل مزودي النطاقات / Best Domain Providers

### 1. Cloudflare Registrar (الأرخص) ⭐⭐⭐⭐⭐

**المميزات:**
- ✅ بسعر التكلفة (~$8-10/سنة)
- ✅ أمان إضافي
- ✅ DNS سريع
- ✅ بدون رسوم إضافية

**الموقع:** https://www.cloudflare.com/products/registrar/

**الخطوات:**
1. سجل حساب في Cloudflare
2. اذهب إلى Registrar
3. ابحث عن `rahaadmin.com`
4. اشترِ النطاق

### 2. Namecheap ⭐⭐⭐⭐

**المميزات:**
- ✅ سعر معقول (~$10-15/سنة)
- ✅ واجهة سهلة
- ✅ دعم جيد

**الموقع:** https://www.namecheap.com

**الخطوات:**
1. اذهب إلى Namecheap
2. ابحث عن `rahaadmin.com`
3. أضفه للسلة
4. اكمل الشراء

### 3. GoDaddy ⭐⭐⭐

**المميزات:**
- ✅ شائع الاستخدام
- ✅ دعم 24/7
- ⚠️ سعر أعلى (~$12-20/سنة)

**الموقع:** https://www.godaddy.com

## مقارنة الأسعار / Price Comparison

| المزود | السعر/سنة | الأفضل لـ |
| Provider | Price/Year | Best For |
|---------|-----------|----------|
| Cloudflare | $8-10 | الأرخص والأسرع |
| Namecheap | $10-15 | سهولة الاستخدام |
| GoDaddy | $12-20 | الدعم الشامل |

## التوصية / Recommendation

### ✅ الأفضل: Cloudflare Registrar
- أرخص سعر
- أمان أفضل
- DNS أسرع

## خطوات الشراء / Purchase Steps

### إذا اخترت Cloudflare:

1. **سجل حساب:**
   - https://www.cloudflare.com
   - Sign Up (مجاني)

2. **انتقل إلى Registrar:**
   - Dashboard > Registrar
   - أو: https://dash.cloudflare.com/registrar

3. **ابحث عن النطاق:**
   - ابحث عن `rahaadmin.com`
   - إذا كان متاحاً، اضغط "Register"

4. **اكمل الشراء:**
   - أدخل معلوماتك
   - ادفع (~$8-10)

5. **بعد الشراء:**
   - النطاق سيكون جاهزاً فوراً
   - اربطه بـ Vercel (انظر أدناه)

### إذا اخترت Namecheap:

1. اذهب إلى: https://www.namecheap.com
2. ابحث عن `rahaadmin.com`
3. أضفه للسلة
4. اكمل الشراء (~$10-15)

## بعد الشراء: ربط النطاق بـ Vercel / After Purchase: Link to Vercel

### الخطوة 1: نشر المشروع على Vercel أولاً

```bash
# حتى لو لم تشتري النطاق بعد، انشر المشروع
vercel login
vercel --prod
```

### الخطوة 2: إضافة النطاق في Vercel

1. **في Vercel Dashboard:**
   - Settings > Domains
   - Add Domain
   - أدخل: `rahaadmin.com`

2. **Vercel سيعطيك DNS records:**
   - اكتبها أو التقط صورة

### الخطوة 3: إعداد DNS في مزود النطاق

#### إذا استخدمت Cloudflare:
1. Dashboard > DNS
2. أضف Records من Vercel

#### إذا استخدمت Namecheap:
1. Domain List > Manage
2. Advanced DNS
3. أضف:
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   
   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   ```

### الخطوة 4: الانتظار

- DNS Propagation: 5 دقائق إلى 48 ساعة
- SSL Certificate: تلقائي من Vercel (بضع دقائق)

## الخطة الموصى بها / Recommended Plan

### Option 1: شراء النطاق الآن
1. ✅ اشترِ `rahaadmin.com` من Cloudflare (~$8-10)
2. ✅ انشر المشروع على Vercel
3. ✅ اربط النطاق
4. ✅ جاهز للعمل!

### Option 2: البدء بالنطاق المجاني ثم الشراء لاحقاً
1. ✅ انشر على Vercel (نطاق مجاني)
2. ✅ ابدأ العمل
3. ⏳ اشترِ النطاق لاحقاً
4. ⏳ اربطه بـ Vercel

## ملاحظات مهمة / Important Notes

1. **التكلفة الإجمالية:**
   - النطاق: ~$8-15/سنة
   - Vercel: مجاني (للمشاريع الصغيرة)
   - MongoDB Atlas: مجاني (للمستوى المجاني)

2. **التجديد:**
   - النطاق يحتاج تجديد سنوي
   - Cloudflare يرسل تذكير قبل انتهاء الصلاحية

3. **البدائل:**
   - إذا `rahaadmin.com` غير متاح:
     - `raha-admin.com`
     - `rahaadmin.net`
     - `rahaadmin.org`

## روابط مفيدة / Useful Links

- Cloudflare Registrar: https://www.cloudflare.com/products/registrar/
- Namecheap: https://www.namecheap.com
- GoDaddy: https://www.godaddy.com
- Vercel Domains: https://vercel.com/docs/concepts/projects/domains
