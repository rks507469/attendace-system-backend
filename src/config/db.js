import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const MONGODB_URI = process.env.DB_URL;

if (!MONGODB_URI) {
    throw new Error('Mongo URI not provided');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) {
        logger.info('Using cached MongoDB connection');
        return cached.conn;
    }

    if (!cached.promise) {
        logger.info('Creating new MongoDB connection');
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    try {
        cached.conn = await cached.promise;
        logger.info(`MongoDB Connected: ${cached.conn.connection.host}`);
        return cached.conn;
    } catch (error) {
        logger.error(`MongoDB Connection failed: ${error.message}`);
        process.exit(1);
    }
}
