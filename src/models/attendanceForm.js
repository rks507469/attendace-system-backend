// src/models/attendanceForm.js
import mongoose from "mongoose";
import { Schema } from "mongoose";

const additionalStudentSchema = new Schema({
    ID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    isNewStudent: {
        type: Boolean,
        default: true
    }
});

const attendanceFormSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,  // Location code (e.g., BIT_MESRA)
        required: true
    },
    locationName: {
        type: String  // Location display name (e.g., BIT Mesra)
    },
    presentStudents: [{
        type: String  // Student names
    }],
    volunteers: [{
        type: String  // Volunteer names
    }],
    additionalStudents: [additionalStudentSchema]
},
{
    timestamps: true
});

// Create a compound index on date and location for uniqueness
attendanceFormSchema.index({ date: 1, location: 1 }, { unique: true });

export default mongoose.model('AttendanceForm', attendanceFormSchema);