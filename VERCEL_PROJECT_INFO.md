# معلومات مشروع Vercel / Vercel Project Information

## معرف المشروع / Project ID

```
prj_jk1OrFDonjMpjQgyqBzQXuqiTyPt
```

## رابط المشروع / Project Link

https://vercel.com/dashboard

## التحقق من حالة المشروع / Check Project Status

### 1. التحقق من النشر / Check Deployment

1. اذهب إلى: https://vercel.com/dashboard
2. اختر المشروع
3. اضغط على "Deployments"
4. تحقق من أن آخر نشر نجح (✅)

### 2. التحقق من Environment Variables

1. Settings > Environment Variables
2. تأكد من وجود:
   - ✅ `MONGODB_URI`
   - ✅ `JWT_SECRET`
   - ✅ `NODE_ENV`
   - ✅ `PORT`

### 3. إضافة النطاق / Add Domain

1. Settings > Domains
2. Add Domain
3. أدخل: `rahaapt.com`
4. أدخل أيضاً: `www.rahaapt.com`

## أوامر CLI / CLI Commands

### ربط المشروع محلياً / Link Project Locally

```bash
cd /Users/allaasheikh/apartment-management-system

# ربط المشروع
vercel link

# عند السؤال عن Project ID، أدخل:
prj_jk1OrFDonjMpjQgyqBzQXuqiTyPt
```

### النشر / Deploy

```bash
# نشر للإنتاج
vercel --prod

# أو نشر للمعاينة
vercel
```

### التحقق من الحالة / Check Status

```bash
# عرض معلومات المشروع
vercel inspect

# عرض النشرات
vercel ls
```

## استكشاف الأخطاء / Troubleshooting

### إذا كان النشر فاشل:

1. **تحقق من Logs:**
   - في Vercel Dashboard
   - Deployments > اختر النشر الفاشل
   - اضغط "View Function Logs"

2. **تحقق من Environment Variables:**
   - Settings > Environment Variables
   - تأكد من أن جميع المتغيرات موجودة

3. **تحقق من Build Logs:**
   - Deployments > Build Logs
   - ابحث عن الأخطاء

### إذا كان الموقع لا يعمل:

1. **تحقق من النشر:**
   - تأكد من أن آخر نشر نجح

2. **تحقق من Environment Variables:**
   - خاصة `MONGODB_URI`

3. **تحقق من Logs:**
   - Function Logs في Vercel Dashboard

## الخطوات التالية / Next Steps

1. ✅ **إضافة النطاق:**
   - Settings > Domains
   - Add: `rahaapt.com`

2. ✅ **إعداد DNS في Cloudflare:**
   - أضف السجلات من Vercel

3. ✅ **التحقق:**
   - انتظر 5-10 دقائق
   - تحقق من: https://rahaapt.com

## روابط مفيدة / Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Project Settings: https://vercel.com/dashboard/[project-name]/settings
- Deployments: https://vercel.com/dashboard/[project-name]/deployments
