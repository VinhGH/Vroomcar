import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    location_text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    seats: {
        type: Number,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    fuel_type: {
        type: String,
        required: true
    },
    price_per_day: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Car = mongoose.model('Car', carSchema);

export default Car;
