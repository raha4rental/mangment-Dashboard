const mongoose = require('mongoose');
require('dotenv').config();

const Customer = require('./models/Customer');
const Owner = require('./models/Owner');
const Apartment = require('./models/Apartment');
const Handover = require('./models/Handover');

async function checkDatabase() {
  try {
    console.log('🔌 محاولة الاتصال بقاعدة البيانات... / Attempting to connect to database...\n');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apartment_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح! / Database connected successfully!\n');
    
    // Count documents in each collection
    const customerCount = await Customer.countDocuments();
    const ownerCount = await Owner.countDocuments();
    const apartmentCount = await Apartment.countDocuments();
    const handoverCount = await Handover.countDocuments();
    
    console.log('📊 إحصائيات قاعدة البيانات / Database Statistics:');
    console.log('═══════════════════════════════════════');
    console.log(`👥 العملاء / Customers: ${customerCount}`);
    console.log(`🏢 الملاك / Owners: ${ownerCount}`);
    console.log(`🏠 الشقق / Apartments: ${apartmentCount}`);
    console.log(`📋 عمليات التسليم / Handovers: ${handoverCount}`);
    console.log('═══════════════════════════════════════\n');
    
    if (customerCount === 0 && ownerCount === 0 && apartmentCount === 0) {
      console.log('⚠️  قاعدة البيانات فارغة! / Database is empty!');
      console.log('💡 نصيحة / Tip: قم بتشغيل ملف seed-data.js لإضافة بيانات تجريبية');
      console.log('   Run seed-data.js to add sample data\n');
      console.log('   npm run seed أو / or node seed-data.js\n');
    } else {
      console.log('✅ قاعدة البيانات تحتوي على بيانات / Database contains data\n');
      
      // Show sample data
      if (ownerCount > 0) {
        console.log('📋 أمثلة على الملاك / Sample Owners:');
        const owners = await Owner.find().limit(3).select('firstName lastName email');
        owners.forEach((owner, index) => {
          console.log(`   ${index + 1}. ${owner.firstName} ${owner.lastName} - ${owner.email}`);
        });
        console.log('');
      }
      
      if (apartmentCount > 0) {
        console.log('📋 أمثلة على الشقق / Sample Apartments:');
        const apartments = await Apartment.find().limit(3).select('apartmentNumber buildingName status rentalInfo.monthlyRent');
        apartments.forEach((apt, index) => {
          console.log(`   ${index + 1}. ${apt.apartmentNumber} - ${apt.buildingName} - ${apt.status} - ${apt.rentalInfo?.monthlyRent || 0} SAR`);
        });
        console.log('');
      }
    }
    
    await mongoose.connection.close();
    console.log('✅ تم إغلاق الاتصال / Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات / Database connection error:');
    console.error(error.message);
    console.error('\n💡 تأكد من أن MongoDB يعمل / Make sure MongoDB is running:');
    console.error('   mongod أو / or brew services start mongodb-community\n');
    process.exit(1);
  }
}

checkDatabase();

