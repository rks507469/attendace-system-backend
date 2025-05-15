import './config/env.js';
import express from 'express';
import connectDB from './config/db.js';
import './models/location.js';
import './models/student.js';
import './models/attendance.js';
import router from './routes/routeIndex.js';
import cors from 'cors';

// Initialize express Application
const expressApplication = express();

// Cors
expressApplication.use(cors({
    origin: '*',
    credentials: true,
}));

// Middleware
expressApplication.use(express.json());

// Routes
expressApplication.use('/api', router);

// Connecting Database
connectDB();

export default expressApplication;