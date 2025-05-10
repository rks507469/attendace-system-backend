import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
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