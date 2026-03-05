import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: { type: String, default: null },
    avatar: { type: String, default: 'default.jpg' },
    authType: { type: String, enum: ['local', 'google'], default: 'local' },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    refreshToken: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
