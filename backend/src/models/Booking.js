import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Chờ duyệt", "Thành công", "Đã hủy"],
        default: "Chờ duyệt"
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
