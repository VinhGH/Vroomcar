import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
