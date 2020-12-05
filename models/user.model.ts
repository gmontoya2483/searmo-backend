import mongoose from 'mongoose';
import SecurityService from "../services/security.service"
import {JWT_PRIVATE_KEY, JWT_AUTH_EXPIRES_IN} from "../globals/environment.global";



const userSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        index: true,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    lastName: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isValidated: {
        value: {type: Boolean, default: false},
        validatedDateTime: {type: Date, default: null}
    },
    isDeleted: {
        value: {type: Boolean, default: false},
        validatedDateTime: {type: Date, default: null}
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    dateTimeCreated: {
        type: Date,
        default: Date.now
    },
    dateTimeUpdated: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = async function () {
    return SecurityService.generateJWT({_id: this._id},
        JWT_PRIVATE_KEY, JWT_AUTH_EXPIRES_IN);
};

//User Model Class
export const User = mongoose.model('User', userSchema);


