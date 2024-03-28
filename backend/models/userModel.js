import mongoose from 'mongoose';

const { Schema } = mongoose;
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }
})

export const User = mongoose.model('User', UserSchema)
