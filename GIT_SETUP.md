# إعداد Git و GitHub / Git and GitHub Setup

## الخطوات / Steps

### 1. إنشاء مستودع جديد على GitHub

1. اذهب إلى [github.com](https://github.com)
2. اضغط على **"+"** في الأعلى ثم **"New repository"**
3. اسم المستودع: `rahateam-management-system` (أو أي اسم تفضله)
4. اختر **Private** أو **Public**
5. **لا** تضع علامة على "Initialize with README"
6. اضغط **"Create repository"**

### 2. ربط المستودع المحلي بـ GitHub

بعد إنشاء المستودع على GitHub، سيعطيك GitHub رابط مثل:
```
https://github.com/yourusername/rahateam-management-system.git
```

أضف هذا الرابط باستخدام:

```bash
git remote add origin https://github.com/yourusername/rahateam-management-system.git
git branch -M main
git push -u origin main
```

### 3. أو استخدم SSH (إذا كان لديك SSH keys)

```bash
git remote add origin git@github.com:yourusername/rahateam-management-system.git
git branch -M main
git push -u origin main
```

## الأوامر الجاهزة / Ready Commands

```bash
# إضافة جميع الملفات
git add .

# عمل commit
git commit -m "RahaTeam - Property Management System"

# ربط مع GitHub (استبدل YOUR_USERNAME والمستودع)
git remote add origin https://github.com/YOUR_USERNAME/rahateam-management-system.git

# رفع الكود
git push -u origin main
```

## بعد الرفع / After Pushing

بعد رفع الكود إلى GitHub، يمكنك:
1. النشر على Vercel مباشرة من GitHub
2. مشاركة الرابط مع الفريق
3. إدارة الكود بشكل أفضل

## رابط المستودع / Repository URL

بعد إنشاء المستودع على GitHub، الرابط سيكون:
```
https://github.com/YOUR_USERNAME/rahateam-management-system
```
