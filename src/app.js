import './config/env.js';
import express from 'express';
import connectDB from './config/db.js';
import './models/Location.js';
import './models/Student.js';
import './models/Attendance.js';
import router from './routes/routeIndex.js';

// Initialize express Application
const expressApplication = express();

// Middleware
expressApplication.use(express.json());

// Routes
expressApplication.use('/api', router);

// Connecting Databse
connectDB();

export default expressApplication;