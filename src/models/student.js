import mongoose from "mongoose";
import { Schema } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Student', studentSchema);