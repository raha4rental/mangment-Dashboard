const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Apartment = require('./models/Apartment');
const Customer = require('./models/Customer');
const Owner = require('./models/Owner');

// Sample data
const sampleApartments = [
    {
        apartmentNumber: 'A101',
        buildingName: 'برج النور',
        address: {
            street: 'شارع الملك فهد',
            city: 'الرياض',
            state: 'منطقة الرياض',
            zipCode: '12345'
        },
        specifications: {
            bedrooms: 2,
            bathrooms: 2,
            area: 120,
            floor: 1,
            balcony: true,
            parking: true
        },
        rentalInfo: {
            monthlyRent: 2500,
            deposit: 5000,
            utilities: {
                electricity: true,
                water: true,
                gas: true,
                internet: true,
                maintenance: true
            }
        },
        status: 'available',
        photos: {
            exterior: [],
            interior: [],
            rooms: []
        },
        furniture: [],
        appliances: []
    },
    {
        apartmentNumber: 'B202',
        buildingName: 'مجمع الشروق',
        address: {
            street: 'شارع العليا',
            city: 'الرياض',
            state: 'منطقة الرياض',
            zipCode: '12346'
        },
        specifications: {
            bedrooms: 3,
            bathrooms: 2,
            area: 180,
            floor: 2,
            balcony: true,
            parking: true
        },
        rentalInfo: {
            monthlyRent: 3500,
            deposit: 7000,
            utilities: {
                electricity: false,
                water: false,
                gas: false,
                internet: false,
                maintenance: true
            }
        },
        status: 'available',
        photos: {
            exterior: [],
            interior: [],
            rooms: []
        },
        furniture: [],
        appliances: []
    },
    {
        apartmentNumber: 'C303',
        buildingName: 'عمارة الحديقة',
        address: {
            street: 'شارع التحلية',
            city: 'جدة',
            state: 'منطقة مكة المكرمة',
            zipCode: '21432'
        },
        specifications: {
            bedrooms: 1,
            bathrooms: 1,
            area: 80,
            floor: 3,
            balcony: false,
            parking: false
        },
        rentalInfo: {
            monthlyRent: 1500,
            deposit: 3000,
            utilities: {
                electricity: true,
                water: true,
                gas: true,
                internet: true,
                maintenance: true
            }
        },
        status: 'occupied',
        photos: {
            exterior: [],
            interior: [],
            rooms: []
        },
        furniture: [],
        appliances: []
    }
];

const sampleCustomers = [
    {
        firstName: 'أحمد',
        lastName: 'الراشد',
        email: 'ahmed@example.com',
        phone: '+966501234567',
        nationalId: '1111111111',
        password: 'password123',
        address: {
            street: 'شارع الملك عبدالعزيز',
            city: 'الرياض',
            state: 'منطقة الرياض'
        },
        occupation: 'مهندس برمجيات',
        emergencyContact: {
            name: 'فاطمة الراشد',
            phone: '+966509876543',
            relationship: 'أخت'
        },
        isActive: true
    },
    {
        firstName: 'سارة',
        lastName: 'المحمد',
        email: 'sara@example.com',
        phone: '+966502345678',
        nationalId: '2222222222',
        password: 'password123',
        address: {
            street: 'شارع العليا',
            city: 'الرياض',
            state: 'منطقة الرياض'
        },
        occupation: 'طبيبة',
        emergencyContact: {
            name: 'محمد المحمد',
            phone: '+966503456789',
            relationship: 'زوج'
        },
        isActive: true
    },
    {
        firstName: 'خالد',
        lastName: 'السعد',
        email: 'khalid@example.com',
        phone: '+966504567890',
        nationalId: '3333333333',
        password: 'password123',
        address: {
            street: 'شارع التحلية',
            city: 'جدة',
            state: 'منطقة مكة المكرمة'
        },
        occupation: 'معلم',
        emergencyContact: {
            name: 'نورا السعد',
            phone: '+966505678901',
            relationship: 'زوجة'
        },
        isActive: true
    }
];

const sampleOwners = [
    {
        firstName: 'عبدالله',
        lastName: 'الغامدي',
        email: 'abdullah@example.com',
        phone: '+966506789012',
        nationalId: '1234567890',
        password: 'password123',
        address: {
            street: 'شارع الملك فهد',
            city: 'الرياض',
            state: 'منطقة الرياض'
        },
        isActive: true
    },
    {
        firstName: 'فاطمة',
        lastName: 'العتيبي',
        email: 'fatima@example.com',
        phone: '+966507890123',
        nationalId: '0987654321',
        password: 'password123',
        address: {
            street: 'شارع العليا',
            city: 'الرياض',
            state: 'منطقة الرياض'
        },
        isActive: true
    }
];

async function seedDatabase() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apartment_management', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Connected to database');

        // Clear existing data
        await Apartment.deleteMany({});
        await Customer.deleteMany({});
        await Owner.deleteMany({});
        
        console.log('Cleared existing data');

        // Create owners first
        const owners = await Owner.insertMany(sampleOwners);
        console.log(`Created ${owners.length} owners`);

        // Create customers
        const customers = await Customer.insertMany(sampleCustomers);
        console.log(`Created ${customers.length} customers`);

        // Create apartments with owner references
        const apartmentsWithOwners = sampleApartments.map((apt, index) => ({
            ...apt,
            ownerId: owners[index % owners.length]._id
        }));

        const apartments = await Apartment.insertMany(apartmentsWithOwners);
        console.log(`Created ${apartments.length} apartments`);

        // Update owners with apartment references
        for (let i = 0; i < apartments.length; i++) {
            const apartment = apartments[i];
            const owner = owners[i % owners.length];
            
            await Owner.findByIdAndUpdate(owner._id, {
                $push: { ownedApartments: { apartmentId: apartment._id } }
            });
        }

        console.log('Database seeded successfully!');
        console.log(`Created ${apartments.length} apartments, ${customers.length} customers, and ${owners.length} owners`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeder
seedDatabase();
