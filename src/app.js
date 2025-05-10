import './src/config/env.js';
import express from 'express';
import mongoose from 'mongoose';

import './models/Location.js';
import './models/Student.js';
import './models/Attendance.js';


const expressApplication = express();

export default expressApplication;