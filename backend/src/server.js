import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { swaggerDocs } from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { createServer } from 'http';
import { initSocket } from './socket/socket.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://vroomcar.vercel.app',
    'https://vroomcar-frontend.vercel.app'
];

app.use(cors({
    origin: (origin, callback) => {
        // Cho phép request không có origin (Postman, server-to-server)
        if (!origin) return callback(null, true);
        // Cho phép localhost và mọi subdomain *.vercel.app của project
        const isAllowed =
            allowedOrigins.includes(origin) ||
            /^https:\/\/vroomcar.*\.vercel\.app$/.test(origin) ||
            /^http:\/\/localhost:\d+$/.test(origin);

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, false); // Trả false thay vì throw để tránh 500 error
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Xử lý preflight OPTIONS request cho tất cả routes
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

// Initialize Socket.io
initSocket(httpServer);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Vroomcar API is running...');
});

const PORT = process.env.PORT || 3001;

swaggerDocs(app, PORT);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
