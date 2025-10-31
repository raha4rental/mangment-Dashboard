# RahaTeam - نشر التطبيق / Deploy Application

## طرق النشر المتاحة / Available Deployment Methods

### 1. Vercel (موصى به / Recommended)

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel

# النشر للإنتاج
vercel --prod
```

أو استخدم GitHub Integration:
1. ادفع الكود إلى GitHub
2. اذهب إلى vercel.com
3. اربط المستودع
4. Vercel سينشر تلقائياً

### 2. Heroku

```bash
# تسجيل الدخول
heroku login

# إنشاء تطبيق
heroku create rahateam-app

# إضافة MongoDB Atlas
heroku addons:create mongolab

# النشر
git push heroku main
```

### 3. Railway

1. اذهب إلى railway.app
2. أنشئ مشروع جديد
3. اربط GitHub repository
4. أضف متغيرات البيئة:
   - `MONGODB_URI`
   - `PORT`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### 4. Render

1. اذهب إلى render.com
2. أنشئ Web Service جديد
3. اربط GitHub repository
4. أضف متغيرات البيئة المطلوبة

### 5. DigitalOcean App Platform

1. اذهب إلى cloud.digitalocean.com
2. أنشئ App جديد
3. اربط GitHub repository
4. أضف متغيرات البيئة

## إعداد Domain (rahateam.com)

بعد النشر، لتوصيل rahateam.com:

### Vercel:
1. اذهب إلى Project Settings > Domains
2. أضف `rahateam.com`
3. اتبع التعليمات لتحديث DNS records

### Heroku:
1. في Heroku Dashboard > Settings > Domains
2. أضف `rahateam.com`
3. استخدم DNS provider لتوجيه النطاق

### DNS Configuration:

أضف هذه السجلات في DNS provider:
- Type: A Record
- Name: @
- Value: [IP Address من منصة النشر]

- Type: CNAME
- Name: www
- Value: rahateam.com

## متغيرات البيئة المطلوبة / Required Environment Variables

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rahateam
PORT=3000
NODE_ENV=production
JWT_SECRET=your-secret-key-here
```

## اختبار قبل النشر / Pre-deployment Testing

```bash
# اختبار محلي
npm start

# التأكد من أن كل شيء يعمل
curl http://localhost:3000
```

## دعم / Support

للمساعدة في النشر، راجع:
- Vercel Docs: https://vercel.com/docs
- Heroku Docs: https://devcenter.heroku.com
