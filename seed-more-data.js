const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Apartment = require('./models/Apartment');
const Customer = require('./models/Customer');
const Owner = require('./models/Owner');

// Extended sample data for 40 apartments
const extendedApartments = [
    // Building 1: برج النور (10 apartments)
    { apartmentNumber: 'A101', buildingName: 'برج النور', floor: 1, bedrooms: 2, bathrooms: 2, area: 120, monthlyRent: 2500, status: 'available' },
    { apartmentNumber: 'A102', buildingName: 'برج النور', floor: 1, bedrooms: 1, bathrooms: 1, area: 80, monthlyRent: 1800, status: 'occupied' },
    { apartmentNumber: 'A201', buildingName: 'برج النور', floor: 2, bedrooms: 3, bathrooms: 2, area: 150, monthlyRent: 3200, status: 'available' },
    { apartmentNumber: 'A202', buildingName: 'برج النور', floor: 2, bedrooms: 2, bathrooms: 2, area: 110, monthlyRent: 2400, status: 'maintenance' },
    { apartmentNumber: 'A301', buildingName: 'برج النور', floor: 3, bedrooms: 4, bathrooms: 3, area: 200, monthlyRent: 4500, status: 'available' },
    { apartmentNumber: 'A302', buildingName: 'برج النور', floor: 3, bedrooms: 1, bathrooms: 1, area: 70, monthlyRent: 1600, status: 'occupied' },
    { apartmentNumber: 'A401', buildingName: 'برج النور', floor: 4, bedrooms: 2, bathrooms: 2, area: 130, monthlyRent: 2800, status: 'available' },
    { apartmentNumber: 'A402', buildingName: 'برج النور', floor: 4, bedrooms: 3, bathrooms: 2, area: 160, monthlyRent: 3500, status: 'occupied' },
    { apartmentNumber: 'A501', buildingName: 'برج النور', floor: 5, bedrooms: 1, bathrooms: 1, area: 90, monthlyRent: 2000, status: 'available' },
    { apartmentNumber: 'A502', buildingName: 'برج النور', floor: 5, bedrooms: 2, bathrooms: 2, area: 140, monthlyRent: 3000, status: 'maintenance' },

    // Building 2: مجمع الشروق (10 apartments)
    { apartmentNumber: 'B101', buildingName: 'مجمع الشروق', floor: 1, bedrooms: 2, bathrooms: 2, area: 125, monthlyRent: 2600, status: 'available' },
    { apartmentNumber: 'B102', buildingName: 'مجمع الشروق', floor: 1, bedrooms: 1, bathrooms: 1, area: 75, monthlyRent: 1700, status: 'occupied' },
    { apartmentNumber: 'B201', buildingName: 'مجمع الشروق', floor: 2, bedrooms: 3, bathrooms: 2, area: 155, monthlyRent: 3300, status: 'available' },
    { apartmentNumber: 'B202', buildingName: 'مجمع الشروق', floor: 2, bedrooms: 2, bathrooms: 2, area: 115, monthlyRent: 2500, status: 'occupied' },
    { apartmentNumber: 'B301', buildingName: 'مجمع الشروق', floor: 3, bedrooms: 4, bathrooms: 3, area: 210, monthlyRent: 4600, status: 'available' },
    { apartmentNumber: 'B302', buildingName: 'مجمع الشروق', floor: 3, bedrooms: 1, bathrooms: 1, area: 65, monthlyRent: 1500, status: 'occupied' },
    { apartmentNumber: 'B401', buildingName: 'مجمع الشروق', floor: 4, bedrooms: 2, bathrooms: 2, area: 135, monthlyRent: 2900, status: 'available' },
    { apartmentNumber: 'B402', buildingName: 'مجمع الشروق', floor: 4, bedrooms: 3, bathrooms: 2, area: 165, monthlyRent: 3600, status: 'occupied' },
    { apartmentNumber: 'B501', buildingName: 'مجمع الشروق', floor: 5, bedrooms: 1, bathrooms: 1, area: 85, monthlyRent: 1900, status: 'available' },
    { apartmentNumber: 'B502', buildingName: 'مجمع الشروق', floor: 5, bedrooms: 2, bathrooms: 2, area: 145, monthlyRent: 3100, status: 'maintenance' },

    // Building 3: عمارة الحديقة (10 apartments)
    { apartmentNumber: 'C101', buildingName: 'عمارة الحديقة', floor: 1, bedrooms: 2, bathrooms: 2, area: 130, monthlyRent: 2700, status: 'available' },
    { apartmentNumber: 'C102', buildingName: 'عمارة الحديقة', floor: 1, bedrooms: 1, bathrooms: 1, area: 80, monthlyRent: 1800, status: 'occupied' },
    { apartmentNumber: 'C201', buildingName: 'عمارة الحديقة', floor: 2, bedrooms: 3, bathrooms: 2, area: 160, monthlyRent: 3400, status: 'available' },
    { apartmentNumber: 'C202', buildingName: 'عمارة الحديقة', floor: 2, bedrooms: 2, bathrooms: 2, area: 120, monthlyRent: 2600, status: 'occupied' },
    { apartmentNumber: 'C301', buildingName: 'عمارة الحديقة', floor: 3, bedrooms: 4, bathrooms: 3, area: 220, monthlyRent: 4700, status: 'available' },
    { apartmentNumber: 'C302', buildingName: 'عمارة الحديقة', floor: 3, bedrooms: 1, bathrooms: 1, area: 70, monthlyRent: 1600, status: 'occupied' },
    { apartmentNumber: 'C401', buildingName: 'عمارة الحديقة', floor: 4, bedrooms: 2, bathrooms: 2, area: 140, monthlyRent: 3000, status: 'available' },
    { apartmentNumber: 'C402', buildingName: 'عمارة الحديقة', floor: 4, bedrooms: 3, bathrooms: 2, area: 170, monthlyRent: 3700, status: 'occupied' },
    { apartmentNumber: 'C501', buildingName: 'عمارة الحديقة', floor: 5, bedrooms: 1, bathrooms: 1, area: 90, monthlyRent: 2000, status: 'available' },
    { apartmentNumber: 'C502', buildingName: 'عمارة الحديقة', floor: 5, bedrooms: 2, bathrooms: 2, area: 150, monthlyRent: 3200, status: 'maintenance' },

    // Building 4: برج الأندلس (10 apartments)
    { apartmentNumber: 'D101', buildingName: 'برج الأندلس', floor: 1, bedrooms: 2, bathrooms: 2, area: 135, monthlyRent: 2800, status: 'available' },
    { apartmentNumber: 'D102', buildingName: 'برج الأندلس', floor: 1, bedrooms: 1, bathrooms: 1, area: 85, monthlyRent: 1900, status: 'occupied' },
    { apartmentNumber: 'D201', buildingName: 'برج الأندلس', floor: 2, bedrooms: 3, bathrooms: 2, area: 165, monthlyRent: 3500, status: 'available' },
    { apartmentNumber: 'D202', buildingName: 'برج الأندلس', floor: 2, bedrooms: 2, bathrooms: 2, area: 125, monthlyRent: 2700, status: 'occupied' },
    { apartmentNumber: 'D301', buildingName: 'برج الأندلس', floor: 3, bedrooms: 4, bathrooms: 3, area: 230, monthlyRent: 4800, status: 'available' },
    { apartmentNumber: 'D302', buildingName: 'برج الأندلس', floor: 3, bedrooms: 1, bathrooms: 1, area: 75, monthlyRent: 1700, status: 'occupied' },
    { apartmentNumber: 'D401', buildingName: 'برج الأندلس', floor: 4, bedrooms: 2, bathrooms: 2, area: 145, monthlyRent: 3100, status: 'available' },
    { apartmentNumber: 'D402', buildingName: 'برج الأندلس', floor: 4, bedrooms: 3, bathrooms: 2, area: 175, monthlyRent: 3800, status: 'occupied' },
    { apartmentNumber: 'D501', buildingName: 'برج الأندلس', floor: 5, bedrooms: 1, bathrooms: 1, area: 95, monthlyRent: 2100, status: 'available' },
    { apartmentNumber: 'D502', buildingName: 'برج الأندلس', floor: 5, bedrooms: 2, bathrooms: 2, area: 155, monthlyRent: 3300, status: 'maintenance' }
];

// Extended customers
const extendedCustomers = [
    { firstName: 'أحمد', lastName: 'الراشد', email: 'ahmed@example.com', phone: '+966501234567', nationalId: '1111111111' },
    { firstName: 'سارة', lastName: 'المحمد', email: 'sara@example.com', phone: '+966502345678', nationalId: '2222222222' },
    { firstName: 'خالد', lastName: 'السعد', email: 'khalid@example.com', phone: '+966504567890', nationalId: '3333333333' },
    { firstName: 'فاطمة', lastName: 'العلي', email: 'fatima@example.com', phone: '+966505678901', nationalId: '4444444444' },
    { firstName: 'محمد', lastName: 'الغامدي', email: 'mohammed@example.com', phone: '+966506789012', nationalId: '5555555555' },
    { firstName: 'نورا', lastName: 'الزهراني', email: 'nora@example.com', phone: '+966507890123', nationalId: '6666666666' },
    { firstName: 'عبدالله', lastName: 'المطيري', email: 'abdullah@example.com', phone: '+966508901234', nationalId: '7777777777' },
    { firstName: 'ريم', lastName: 'العتيبي', email: 'reem@example.com', phone: '+966509012345', nationalId: '8888888888' },
    { firstName: 'يوسف', lastName: 'الحربي', email: 'youssef@example.com', phone: '+966500123456', nationalId: '9999999999' },
    { firstName: 'هند', lastName: 'القحطاني', email: 'hind@example.com', phone: '+966501234567', nationalId: '1010101010' }
];

// Extended owners
const extendedOwners = [
    { firstName: 'عبدالله', lastName: 'الغامدي', email: 'abdullah@example.com', phone: '+966506789012', nationalId: '1234567890' },
    { firstName: 'فاطمة', lastName: 'العتيبي', email: 'fatima@example.com', phone: '+966507890123', nationalId: '0987654321' },
    { firstName: 'محمد', lastName: 'الزهراني', email: 'mohammed@example.com', phone: '+966508901234', nationalId: '1122334455' },
    { firstName: 'نورا', lastName: 'المطيري', email: 'nora@example.com', phone: '+966509012345', nationalId: '5544332211' }
];

async function seedExtendedDatabase() {
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
        const owners = await Owner.insertMany(extendedOwners.map(owner => ({
            ...owner,
            password: 'password123',
            address: {
                street: 'شارع الملك فهد',
                city: 'الرياض',
                state: 'منطقة الرياض'
            },
            isActive: true
        })));
        console.log(`Created ${owners.length} owners`);

        // Create customers
        const customers = await Customer.insertMany(extendedCustomers.map(customer => ({
            ...customer,
            password: 'password123',
            address: {
                street: 'شارع الملك عبدالعزيز',
                city: 'الرياض',
                state: 'منطقة الرياض'
            },
            occupation: 'موظف',
            emergencyContact: {
                name: 'جهة الطوارئ',
                phone: '+966509876543',
                relationship: 'أقارب'
            },
            isActive: true
        })));
        console.log(`Created ${customers.length} customers`);

        // Create apartments with owner references
        const apartments = [];
        for (let i = 0; i < extendedApartments.length; i++) {
            const aptData = extendedApartments[i];
            const owner = owners[i % owners.length];
            const customer = customers[i % customers.length];
            
            const apartment = {
                apartmentNumber: aptData.apartmentNumber,
                buildingName: aptData.buildingName,
                address: {
                    street: 'شارع الملك فهد',
                    city: 'الرياض',
                    state: 'منطقة الرياض',
                    zipCode: '12345',
                    country: 'Saudi Arabia'
                },
                ownerId: owner._id,
                specifications: {
                    bedrooms: aptData.bedrooms,
                    bathrooms: aptData.bathrooms,
                    area: aptData.area,
                    floor: aptData.floor,
                    hasBalcony: Math.random() > 0.5,
                    hasElevator: Math.random() > 0.3,
                    hasParking: Math.random() > 0.2
                },
                rentalInfo: {
                    monthlyRent: aptData.monthlyRent,
                    deposit: aptData.monthlyRent * 2,
                    utilities: {
                        electricity: Math.random() > 0.5,
                        water: Math.random() > 0.5,
                        gas: Math.random() > 0.5,
                        internet: Math.random() > 0.5,
                        maintenance: true
                    }
                },
                status: aptData.status,
                photos: {
                    exterior: [],
                    interior: [],
                    rooms: []
                },
                furniture: [],
                appliances: []
            };

            // Add tenant if occupied
            if (aptData.status === 'occupied') {
                apartment.currentTenant = {
                    customerId: customer._id,
                    startDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
                    endDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000),
                    rentAmount: aptData.monthlyRent,
                    depositAmount: aptData.monthlyRent * 2
                };
            }

            apartments.push(apartment);
        }

        const createdApartments = await Apartment.insertMany(apartments);
        console.log(`Created ${createdApartments.length} apartments`);

        // Update owners with apartment references
        for (let i = 0; i < createdApartments.length; i++) {
            const apartment = createdApartments[i];
            const owner = owners[i % owners.length];
            
            await Owner.findByIdAndUpdate(owner._id, {
                $push: { ownedApartments: { apartmentId: apartment._id } }
            });
        }

        console.log('Extended database seeded successfully!');
        console.log(`Created ${createdApartments.length} apartments, ${customers.length} customers, and ${owners.length} owners`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding extended database:', error);
        process.exit(1);
    }
}

// Run the seeder
seedExtendedDatabase();


