import mongoose from "mongoose";
import { Schema } from "mongoose";

const attendanceSchema = new Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    volunteer: {
        type: [String],
        required: true
    },
    present: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    absent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
},
    {
        timestamps: true
    });

attendanceSchema.index({ date: 1, location: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);