# إصلاح مشكلة rahaadmin.com / Fix rahaadmin.com Issue

## المشكلة / The Problem
النطاق `https://rahaadmin.com` لا يعمل حالياً / The domain `https://rahaadmin.com` is not working currently.

## الحلول / Solutions

### 1. التحقق من حالة النشر على Vercel / Check Vercel Deployment Status

```bash
# التحقق من حالة المشروع
vercel ls

# أو اذهب إلى: https://vercel.com/dashboard
```

### 2. إضافة النطاق إلى Vercel / Add Domain to Vercel

#### عبر الموقع / Via Website:
1. اذهب إلى: https://vercel.com/dashboard
2. اختر المشروع الخاص بك
3. اذهب إلى **Settings** > **Domains**
4. اضغط **Add Domain**
5. أدخل: `rahaadmin.com`
6. أدخل أيضاً: `www.rahaadmin.com`
7. اتبع التعليمات لتحديث DNS

#### عبر CLI / Via CLI:
```bash
cd /Users/allaasheikh/apartment-management-system
vercel domains add rahaadmin.com
vercel domains add www.rahaadmin.com
```

### 3. إعداد DNS Records / Configure DNS Records

في مزود النطاق الخاص بك (مثل GoDaddy, Namecheap, etc.)، أضف:

#### Option 1: استخدام Vercel DNS (موصى به) / Use Vercel DNS (Recommended)
```
Type: NS
Name: @
Value: [Nameservers من Vercel]
```

#### Option 2: استخدام A Record / Use A Record
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

### 4. النشر على Vercel / Deploy to Vercel

```bash
cd /Users/allaasheikh/apartment-management-system

# التأكد من تسجيل الدخول
vercel login

# النشر
vercel --prod
```

### 5. التحقق من النشر / Verify Deployment

بعد النشر، تحقق من:
- ✅ الموقع يعمل على: `https://[project-name].vercel.app`
- ✅ النطاق المخصص يعمل: `https://rahaadmin.com`
- ✅ www يعمل: `https://www.rahaadmin.com`

## استكشاف الأخطاء / Troubleshooting

### الخطأ: "Domain not found"
**الحل**: تأكد من إضافة النطاق في Vercel Dashboard

### الخطأ: "DNS not configured"
**الحل**: 
1. انتظر 24-48 ساعة حتى يتم نشر DNS
2. تحقق من DNS records باستخدام: https://dnschecker.org

### الخطأ: "SSL Certificate error"
**الحل**: Vercel يوفر SSL تلقائياً، انتظر بضع دقائق

### الخطأ: "404 Not Found"
**الحل**: 
1. تأكد من أن `vercel.json` محدث
2. تأكد من أن الملفات موجودة في `public/`
3. أعد النشر: `vercel --prod`

## التحقق السريع / Quick Check

```bash
# التحقق من حالة النطاق
dig rahaadmin.com

# التحقق من SSL
curl -I https://rahaadmin.com

# التحقق من النشر
vercel inspect
```

## روابط مفيدة / Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Domains Docs: https://vercel.com/docs/concepts/projects/domains
- DNS Checker: https://dnschecker.org

## ملاحظات / Notes

- قد يستغرق DNS من 5 دقائق إلى 48 ساعة
- Vercel يوفر SSL تلقائياً
- تأكد من إضافة جميع متغيرات البيئة في Vercel Dashboard
