const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Handover = require('./models/Handover');
const Apartment = require('./models/Apartment');
const Customer = require('./models/Customer');
const Owner = require('./models/Owner');

// Sample handover data
const sampleHandovers = [
    {
        handoverType: 'initial',
        handoverDate: new Date('2024-01-15'),
        status: 'completed',
        furnitureChecklist: [
            {
                item: 'سرير مزدوج',
                condition: 'excellent',
                notes: 'حالة ممتازة',
                isPresent: true
            },
            {
                item: 'خزانة ملابس',
                condition: 'good',
                notes: 'حالة جيدة مع خدوش بسيطة',
                isPresent: true
            },
            {
                item: 'طاولة طعام',
                condition: 'fair',
                notes: 'تحتاج صيانة بسيطة',
                isPresent: true
            }
        ],
        appliancesChecklist: [
            {
                item: 'ثلاجة',
                brand: 'LG',
                model: 'LG-2023',
                serialNumber: 'LG123456789',
                condition: 'excellent',
                isWorking: true,
                notes: 'تعمل بشكل ممتاز'
            },
            {
                item: 'غسالة',
                brand: 'Samsung',
                model: 'SAMSUNG-2023',
                serialNumber: 'SAM987654321',
                condition: 'good',
                isWorking: true,
                notes: 'تعمل بشكل جيد'
            },
            {
                item: 'مكيف هواء',
                brand: 'Carrier',
                model: 'CARRIER-2023',
                serialNumber: 'CAR456789123',
                condition: 'fair',
                isWorking: true,
                notes: 'يحتاج تنظيف'
            }
        ],
        roomInspection: [
            {
                roomType: 'غرفة النوم الرئيسية',
                condition: 'excellent',
                notes: 'الغرفة في حالة ممتازة',
                issues: []
            },
            {
                roomType: 'غرفة المعيشة',
                condition: 'good',
                notes: 'الغرفة في حالة جيدة',
                issues: [
                    {
                        description: 'خدش في الحائط',
                        severity: 'minor',
                        photos: []
                    }
                ]
            },
            {
                roomType: 'المطبخ',
                condition: 'good',
                notes: 'المطبخ في حالة جيدة',
                issues: []
            }
        ],
        utilitiesInspection: {
            electricity: {
                working: true,
                notes: 'التيار الكهربائي يعمل بشكل طبيعي'
            },
            water: {
                working: true,
                notes: 'المياه تعمل بشكل طبيعي'
            },
            gas: {
                working: true,
                notes: 'الغاز يعمل بشكل طبيعي'
            },
            internet: {
                working: true,
                notes: 'الإنترنت متاح'
            },
            airConditioning: {
                working: true,
                notes: 'التكييف يعمل بشكل جيد'
            }
        },
        keys: {
            mainDoor: {
                provided: true,
                count: 2,
                notes: 'مفتاحان للباب الرئيسي'
            },
            roomKeys: [
                {
                    room: 'غرفة النوم',
                    provided: true,
                    count: 1,
                    notes: 'مفتاح واحد'
                }
            ],
            parkingKey: {
                provided: true,
                count: 1,
                notes: 'مفتاح موقف السيارات'
            },
            elevatorKey: {
                provided: false,
                count: 0,
                notes: 'لا يوجد مفتاح مصعد'
            }
        },
        generalNotes: 'الشقة في حالة جيدة بشكل عام، مع بعض الخدوش البسيطة التي لا تؤثر على الاستخدام',
        issues: [
            {
                description: 'خدش في حائط غرفة المعيشة',
                severity: 'minor',
                category: 'structure',
                photos: [],
                reportedBy: null,
                reportedAt: new Date('2024-01-15'),
                status: 'acknowledged'
            }
        ],
        signatures: {
            tenant: {
                signed: true,
                signaturePath: '/uploads/signatures/tenant_signature_1.png',
                signedAt: new Date('2024-01-15T10:30:00')
            },
            owner: {
                signed: true,
                signaturePath: '/uploads/signatures/owner_signature_1.png',
                signedAt: new Date('2024-01-15T10:35:00')
            },
            witness: {
                name: 'أحمد الشاهد',
                id: '1234567890',
                signaturePath: '/uploads/signatures/witness_signature_1.png',
                signedAt: new Date('2024-01-15T10:40:00')
            }
        }
    },
    {
        handoverType: 'final',
        handoverDate: new Date('2024-06-15'),
        status: 'pending',
        furnitureChecklist: [
            {
                item: 'سرير مزدوج',
                condition: 'good',
                notes: 'حالة جيدة مع تآكل بسيط',
                isPresent: true
            },
            {
                item: 'خزانة ملابس',
                condition: 'fair',
                notes: 'خدوش متوسطة',
                isPresent: true
            },
            {
                item: 'طاولة طعام',
                condition: 'poor',
                notes: 'تحتاج إصلاح',
                isPresent: true
            }
        ],
        appliancesChecklist: [
            {
                item: 'ثلاجة',
                brand: 'LG',
                model: 'LG-2023',
                serialNumber: 'LG123456789',
                condition: 'good',
                isWorking: true,
                notes: 'تعمل بشكل جيد'
            },
            {
                item: 'غسالة',
                brand: 'Samsung',
                model: 'SAMSUNG-2023',
                serialNumber: 'SAM987654321',
                condition: 'fair',
                isWorking: true,
                notes: 'تحتاج صيانة'
            },
            {
                item: 'مكيف هواء',
                brand: 'Carrier',
                model: 'CARRIER-2023',
                serialNumber: 'CAR456789123',
                condition: 'poor',
                isWorking: false,
                notes: 'لا يعمل - يحتاج إصلاح'
            }
        ],
        roomInspection: [
            {
                roomType: 'غرفة النوم الرئيسية',
                condition: 'good',
                notes: 'الغرفة في حالة جيدة',
                issues: [
                    {
                        description: 'تآكل في السجاد',
                        severity: 'moderate',
                        photos: []
                    }
                ]
            },
            {
                roomType: 'غرفة المعيشة',
                condition: 'fair',
                notes: 'الغرفة تحتاج تنظيف',
                issues: [
                    {
                        description: 'بقع على الحائط',
                        severity: 'moderate',
                        photos: []
                    }
                ]
            },
            {
                roomType: 'المطبخ',
                condition: 'good',
                notes: 'المطبخ في حالة جيدة',
                issues: []
            }
        ],
        utilitiesInspection: {
            electricity: {
                working: true,
                notes: 'التيار الكهربائي يعمل بشكل طبيعي'
            },
            water: {
                working: true,
                notes: 'المياه تعمل بشكل طبيعي'
            },
            gas: {
                working: true,
                notes: 'الغاز يعمل بشكل طبيعي'
            },
            internet: {
                working: true,
                notes: 'الإنترنت متاح'
            },
            airConditioning: {
                working: false,
                notes: 'التكييف لا يعمل'
            }
        },
        keys: {
            mainDoor: {
                provided: true,
                count: 2,
                notes: 'مفتاحان للباب الرئيسي'
            },
            roomKeys: [
                {
                    room: 'غرفة النوم',
                    provided: true,
                    count: 1,
                    notes: 'مفتاح واحد'
                }
            ],
            parkingKey: {
                provided: true,
                count: 1,
                notes: 'مفتاح موقف السيارات'
            },
            elevatorKey: {
                provided: false,
                count: 0,
                notes: 'لا يوجد مفتاح مصعد'
            }
        },
        generalNotes: 'الشقة تحتاج تنظيف وصيانة، خاصة التكييف والسجاد',
        issues: [
            {
                description: 'التكييف لا يعمل',
                severity: 'major',
                category: 'appliances',
                photos: [],
                reportedBy: null,
                reportedAt: new Date('2024-06-15'),
                status: 'reported'
            },
            {
                description: 'تآكل في السجاد',
                severity: 'moderate',
                category: 'furniture',
                photos: [],
                reportedBy: null,
                reportedAt: new Date('2024-06-15'),
                status: 'reported'
            }
        ],
        signatures: {
            tenant: {
                signed: false,
                signaturePath: '',
                signedAt: null
            },
            owner: {
                signed: false,
                signaturePath: '',
                signedAt: null
            },
            witness: {
                name: '',
                id: '',
                signaturePath: '',
                signedAt: null
            }
        }
    }
];

async function seedHandovers() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apartment_management', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Connected to database');

        // Clear existing handovers
        await Handover.deleteMany({});
        console.log('Cleared existing handovers');

        // Get apartments and customers
        const apartments = await Apartment.find({ status: 'occupied' }).limit(2);
        const customers = await Customer.find().limit(2);
        const owners = await Owner.find().limit(2);

        if (apartments.length === 0 || customers.length === 0 || owners.length === 0) {
            console.log('Not enough data to create handovers');
            return;
        }

        // Create handovers
        const handovers = [];
        for (let i = 0; i < Math.min(apartments.length, sampleHandovers.length); i++) {
            const apartment = apartments[i];
            const customer = customers[i % customers.length];
            const owner = owners[i % owners.length];
            
            const handoverData = {
                ...sampleHandovers[i],
                apartmentId: apartment._id,
                tenantId: customer._id,
                ownerId: owner._id
            };

            const handover = new Handover(handoverData);
            await handover.save();
            handovers.push(handover);
        }

        console.log(`Created ${handovers.length} handovers successfully!`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding handovers:', error);
        process.exit(1);
    }
}

// Run the seeder
seedHandovers();


