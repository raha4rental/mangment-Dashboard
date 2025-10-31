# نشر سريع على Vercel / Quick Deploy to Vercel

## الطريقة الأسهل (من GitHub مباشرة) / Easiest Way (Direct from GitHub)

### الخطوات / Steps:

1. **اذهب إلى Vercel:**
   - افتح: https://vercel.com/new
   - أو: https://vercel.com/dashboard

2. **سجل الدخول:**
   - استخدم حساب GitHub
   - اضغط "Continue with GitHub"

3. **أضف مشروع جديد:**
   - اضغط "Add New Project"
   - اختر المستودع: `raha4rental/mangment-website`
   - اضغط "Import"

4. **إعدادات المشروع:**
   - Framework Preset: **Other** أو **Other**
   - Root Directory: `./` (اتركه فارغاً)
   - Build Command: (اتركه فارغاً - لا حاجة لبناء)
   - Output Directory: (اتركه فارغاً)
   - Install Command: `npm install`

5. **أضف Environment Variables (متغيرات البيئة):**
   اضغط "Environment Variables" وأضف:

   ```
   MONGODB_URI = mongodb://localhost:27017/apartment_management
   JWT_SECRET = your-secret-key-here-change-this
   NODE_ENV = production
   PORT = 3000
   ```

   **ملاحظة:** استبدل `MONGODB_URI` برابط MongoDB Atlas إذا كنت تستخدمه في الإنتاج.

6. **نشر:**
   - اضغط "Deploy"
   - Vercel سينشر تلقائياً

7. **بعد النشر:**
   - Vercel سيعطيك رابط مثل: `https://mangment-website.vercel.app`
   - يمكنك تخصيص Domain لاحقاً

## إضافة Domain (rahateam.com):

بعد النشر:
1. في Vercel Dashboard > Project > Settings > Domains
2. اضغط "Add Domain"
3. أدخل: `rahateam.com`
4. أدخل: `www.rahateam.com`
5. اتبع التعليمات لتحديث DNS records في مزود Domain الخاص بك

## أو استخدم Vercel CLI (يحتاج تسجيل دخول):

```bash
vercel login
vercel
vercel --prod
```

---
