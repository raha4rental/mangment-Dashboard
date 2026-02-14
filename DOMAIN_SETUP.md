# إعداد النطاق rahaadmin.com / Setup rahaadmin.com Domain

## الوضع الحالي / Current Status
النطاق `rahaadmin.com` غير موجود أو غير مربوط / Domain `rahaadmin.com` is not found or not linked

## الحلول / Solutions

### Option 1: شراء النطاق من جديد / Buy Domain Again

#### مزودو النطاقات الموصى بهم / Recommended Domain Providers:

1. **Namecheap** (موصى به) / (Recommended)
   - الموقع: https://www.namecheap.com
   - السعر: ~$10-15/سنة
   - سهولة الاستخدام

2. **GoDaddy**
   - الموقع: https://www.godaddy.com
   - السعر: ~$12-20/سنة
   - شائع الاستخدام

3. **Cloudflare Registrar**
   - الموقع: https://www.cloudflare.com/products/registrar/
   - السعر: بسعر التكلفة (~$8-10/سنة)
   - الأفضل من ناحية الأمان

4. **Google Domains** (الآن Squarespace)
   - الموقع: https://domains.squarespace.com
   - السعر: ~$12-15/سنة

### Option 2: استخدام نطاق بديل / Use Alternative Domain

إذا كان `rahaadmin.com` غير متاح، يمكنك استخدام:
- `raha-admin.com`
- `rahaadmin.net`
- `rahaadmin.org`
- `raha-admin.net`

### Option 3: استخدام نطاق Vercel المجاني / Use Free Vercel Domain

Vercel يوفر نطاق مجاني مثل:
- `your-project.vercel.app`
- يمكنك استخدامه مؤقتاً حتى تشتري النطاق

## خطوات الشراء والإعداد / Purchase and Setup Steps

### 1. شراء النطاق / Purchase Domain

1. اذهب إلى أحد مزودي النطاقات أعلاه
2. ابحث عن `rahaadmin.com`
3. إذا كان متاحاً، اشتره
4. إذا لم يكن متاحاً، جرب البدائل

### 2. ربط النطاق بـ Vercel / Link Domain to Vercel

بعد الشراء:

#### عبر Vercel Dashboard:
1. اذهب إلى: https://vercel.com/dashboard
2. اختر المشروع
3. Settings > Domains
4. Add Domain
5. أدخل: `rahaadmin.com`
6. اتبع تعليمات DNS

#### إعداد DNS في مزود النطاق:

**إذا استخدمت Namecheap:**
1. اذهب إلى Domain List
2. اختر rahaadmin.com
3. Advanced DNS
4. أضف هذه السجلات:

```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

**إذا استخدمت GoDaddy:**
1. اذهب إلى My Products > Domains
2. اختر rahaadmin.com
3. DNS
4. أضف نفس السجلات أعلاه

**إذا استخدمت Cloudflare:**
1. أضف النطاق إلى Cloudflare
2. غير Nameservers في مزود النطاق
3. في Cloudflare، أضف DNS records من Vercel

### 3. النشر على Vercel / Deploy to Vercel

```bash
cd /Users/allaasheikh/apartment-management-system

# تسجيل الدخول
vercel login

# ربط المشروع (أو إنشاء جديد)
vercel link

# النشر
vercel --prod
```

## التحقق / Verification

بعد الإعداد (5-10 دقائق):
- ✅ https://rahaadmin.com
- ✅ https://www.rahaadmin.com
- ✅ SSL Certificate (تلقائي من Vercel)

## ملاحظات مهمة / Important Notes

1. **DNS Propagation**: قد يستغرق من 5 دقائق إلى 48 ساعة
2. **SSL Certificate**: Vercel يوفر SSL تلقائياً (مجاني)
3. **Environment Variables**: تأكد من إضافتها في Vercel
4. **التكلفة**: النطاق فقط (~$10-15/سنة)، Vercel مجاني للمشاريع الصغيرة

## البدائل السريعة / Quick Alternatives

إذا كنت تريد البدء فوراً بدون شراء نطاق:

1. استخدم نطاق Vercel المجاني:
   - `your-project-name.vercel.app`
   - مجاني تماماً
   - SSL تلقائي

2. استخدم نطاق فرعي:
   - إذا كان لديك نطاق آخر
   - `admin.yourdomain.com`

## روابط مفيدة / Useful Links

- Namecheap: https://www.namecheap.com
- GoDaddy: https://www.godaddy.com
- Cloudflare: https://www.cloudflare.com
- Vercel Domains: https://vercel.com/docs/concepts/projects/domains
- DNS Checker: https://dnschecker.org
