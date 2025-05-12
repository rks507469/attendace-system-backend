import mongoose from "mongoose";
import { Schema } from "mongoose";

const locationSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Location', locationSchema);