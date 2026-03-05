import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Car from './models/Car.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        // Clear existing data
        await Category.deleteMany();
        await Car.deleteMany();
        await User.deleteMany();

        // Create Categories
        const categories = await Category.insertMany([
            { name: 'SEDAN' },
            { name: 'SUV' },
            { name: 'Hạng sang' },
            { name: 'Bán tải' },
        ]);

        const sedanId = categories[0]._id;
        const suvId = categories[1]._id;
        const luxId = categories[2]._id;
        const pickupId = categories[3]._id;

        // Create Cars
        await Car.insertMany([
            {
                name: "Toyota Camry 2024",
                category_id: sedanId,
                price_per_day: 1200000,
                image_url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=800&auto=format&fit=crop",
                rating: 4.8,
                location_text: "Hà Nội",
                seats: 5,
                fuel_type: "Xăng",
                transmission: "Tự động"
            },
            {
                name: "Honda CR-V 2024",
                category_id: suvId,
                price_per_day: 1500000,
                image_url: "https://images.unsplash.com/photo-1605891339410-bbb3b9ad53c9?q=80&w=800&auto=format&fit=crop",
                rating: 4.7,
                location_text: "TP. Hồ Chí Minh",
                seats: 7,
                fuel_type: "Xăng",
                transmission: "Tự động"
            },
            {
                name: "Mercedes-Benz C300",
                category_id: luxId,
                price_per_day: 3500000,
                image_url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop",
                rating: 4.9,
                location_text: "Đà Nẵng",
                seats: 5,
                fuel_type: "Xăng",
                transmission: "Tự động"
            },
            {
                name: "Hyundai Tucson 2024",
                category_id: suvId,
                price_per_day: 1100000,
                image_url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop",
                rating: 4.6,
                location_text: "Hà Nội",
                seats: 5,
                fuel_type: "Xăng",
                transmission: "Tự động"
            },
            {
                name: "Ford Ranger Wildtrak",
                category_id: pickupId,
                price_per_day: 1800000,
                image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
                rating: 4.5,
                location_text: "TP. Hồ Chí Minh",
                seats: 5,
                fuel_type: "Dầu",
                transmission: "Tự động"
            },
        ]);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
