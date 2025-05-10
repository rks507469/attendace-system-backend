import mongoose from "mongoose";

const attendaceSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    date: {
        type: Date,
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

attendaceSchema.index({ date: 1, location: 1 }, { unique: true });

export default mongoose.model('Attendance', attendaceSchema);