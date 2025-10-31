const mongoose = require('mongoose');
require('dotenv').config();

const Owner = require('./models/Owner');

async function createOwner() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apartment_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to database / تم الاتصال بقاعدة البيانات\n');

    const email = 'raha4rental@gmail.com';
    const defaultPassword = 'password123';

    // Check if owner already exists
    let owner = await Owner.findOne({ email });
    
    if (owner) {
      // Update existing owner
      owner.firstName = owner.firstName || 'Raha';
      owner.lastName = owner.lastName || 'Rental';
      owner.phone = owner.phone || '+966501234567';
      owner.nationalId = owner.nationalId || '9876543210';
      owner.password = defaultPassword; // Will be hashed by pre-save hook
      owner.isActive = true;
      await owner.save();
      
      console.log('✅ Owner updated successfully / تم تحديث المالك بنجاح\n');
      console.log('📧 Email:', email);
      console.log('🔑 Password:', defaultPassword);
      console.log('👤 Name:', `${owner.firstName} ${owner.lastName}`);
    } else {
      // Create new owner
      owner = new Owner({
        firstName: 'Raha',
        lastName: 'Rental',
        email: email,
        phone: '+966501234567',
        nationalId: '9876543210',
        password: defaultPassword,
        address: {
          street: 'شارع الملك فهد',
          city: 'الرياض',
          state: 'منطقة الرياض',
          country: 'Saudi Arabia'
        },
        occupation: 'Property Manager',
        companyName: 'Raha Rental',
        isActive: true
      });

      await owner.save();
      
      console.log('✅ Owner created successfully / تم إنشاء المالك بنجاح\n');
      console.log('📧 Email:', email);
      console.log('🔑 Password:', defaultPassword);
      console.log('👤 Name:', `${owner.firstName} ${owner.lastName}`);
    }

    console.log('\n✅ Done! You can now login with:');
    console.log('   Email:', email);
    console.log('   Password:', defaultPassword);
    console.log('\n✅ تم! يمكنك تسجيل الدخول الآن باستخدام:');
    console.log('   البريد الإلكتروني:', email);
    console.log('   كلمة المرور:', defaultPassword);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error / خطأ:', error.message);
    process.exit(1);
  }
}

createOwner();

