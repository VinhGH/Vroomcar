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
    origin: allowedOrigins,
    credentials: true
}));


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
