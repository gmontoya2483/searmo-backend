    import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Security from "../classes/security.class"
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
    return Security.generateJWT({_id: this._id},
        JWT_PRIVATE_KEY, JWT_AUTH_EXPIRES_IN);
};

//User Model Class
export const User = mongoose.model('User', userSchema);


