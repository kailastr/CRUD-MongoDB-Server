import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;