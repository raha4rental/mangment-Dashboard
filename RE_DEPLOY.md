# إعادة نشر rahaadmin.com / Redeploy rahaadmin.com

## الخطوات / Steps

### 1. رفع التغييرات إلى Git / Push Changes to Git

```bash
cd /Users/allaasheikh/apartment-management-system

# إضافة التغييرات
git add vercel.json server.js public/booking.html public/index-modern.html

# عمل commit
git commit -m "Update: Add booking website and fix Vercel config"

# رفع إلى GitHub
git push origin main
```

### 2. النشر على Vercel / Deploy to Vercel

#### الطريقة 1: عبر Vercel Dashboard (الأسهل) / Via Dashboard (Easiest)
1. اذهب إلى: https://vercel.com/dashboard
2. اختر المشروع الخاص بـ rahaadmin.com
3. اضغط **Redeploy** أو انتظر النشر التلقائي من GitHub

#### الطريقة 2: عبر CLI / Via CLI
```bash
# تسجيل الدخول (إذا لم تكن مسجل)
vercel login

# النشر للإنتاج
vercel --prod
```

### 3. التحقق من النطاق / Verify Domain

1. اذهب إلى: https://vercel.com/dashboard
2. اختر المشروع
3. Settings > Domains
4. تأكد من أن `rahaadmin.com` و `www.rahaadmin.com` موجودين
5. إذا لم يكونا موجودين، أضفهما

### 4. التحقق من الموقع / Check Website

بعد النشر (5-10 دقائق):
- ✅ https://rahaadmin.com
- ✅ https://rahaadmin.com/booking.html
- ✅ https://rahaadmin.com/index-modern.html
- ✅ https://www.rahaadmin.com

## استكشاف الأخطاء / Troubleshooting

### الموقع لا يعمل بعد النشر
1. انتظر 5-10 دقائق
2. امسح cache المتصفح (Ctrl+Shift+R أو Cmd+Shift+R)
3. تحقق من Vercel Dashboard > Deployments

### خطأ 404
- تأكد من أن `vercel.json` محدث
- تأكد من أن الملفات موجودة في `public/`

### خطأ DNS
- انتظر حتى 48 ساعة
- تحقق من DNS records في مزود النطاق

## ملاحظات / Notes

- Vercel ينشر تلقائياً عند push إلى GitHub (إذا كان مربوطاً)
- تأكد من إضافة جميع Environment Variables في Vercel
- SSL Certificate يتم توفيره تلقائياً من Vercel
