# RahaTeam - تعليمات النشر

## النشر السريع على Vercel

### الطريقة 1: باستخدام Vercel CLI

```bash
# 1. تثبيت Vercel CLI
npm i -g vercel

# 2. النشر
vercel

# 3. متابعة التعليمات على الشاشة
# 4. للإنتاج:
vercel --prod
```

### الطريقة 2: باستخدام GitHub (موصى به)

1. ادفع الكود إلى GitHub:
```bash
git init
git add .
git commit -m "RahaTeam - Property Management System"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. اذهب إلى [vercel.com](https://vercel.com)
3. سجل الدخول بـ GitHub
4. اضغط "Add New Project"
5. اختر المستودع
6. Vercel سيكتشف الإعدادات تلقائياً
7. أضف متغيرات البيئة:
   - `MONGODB_URI` - رابط MongoDB
   - `JWT_SECRET` - مفتاح JWT
   - `NODE_ENV=production`

## إعداد Domain (rahateam.com)

بعد النشر على Vercel:

1. اذهب إلى Project Settings > Domains
2. أضف `rahateam.com` و `www.rahateam.com`
3. Vercel سيعطيك DNS records
4. أضفها في DNS provider الخاص بك:
   - Type: A Record
   - Name: @
   - Value: [IP من Vercel]
   - Type: CNAME
   - Name: www
   - Value: [من Vercel]

## النشر على Heroku

```bash
# تثبيت Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# تسجيل الدخول
heroku login

# إنشاء تطبيق
heroku create rahateam-app

# إضافة MongoDB Atlas (مجاني)
heroku addons:create mongolab

# إضافة متغيرات البيئة
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production

# النشر
git push heroku main

# إضافة Domain
heroku domains:add rahateam.com
heroku domains:add www.rahateam.com
```

## النشر على Railway

1. اذهب إلى [railway.app](https://railway.app)
2. New Project > Deploy from GitHub
3. اختر المستودع
4. أضف متغيرات البيئة:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT=3000`
   - `NODE_ENV=production`
5. Railway سينشر تلقائياً

## اختبار محلي قبل النشر

```bash
# 1. تأكد من تثبيت التبعيات
npm install

# 2. أنشئ ملف .env
cp env.example .env
# ثم عدّل القيم

# 3. شغّل الخادم
npm start

# 4. افتح المتصفح
open http://localhost:3000
```

## ملاحظات مهمة

- تأكد من إضافة MongoDB URI في متغيرات البيئة
- استخدم JWT_SECRET قوي وآمن
- راجع ملف .gitignore للتأكد من عدم رفع ملفات حساسة
