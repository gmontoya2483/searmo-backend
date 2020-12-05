import mongoose, { Schema } from 'mongoose';
import { User } from "./user.model";


const groupMemberSchema = new mongoose.Schema({
    group: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'

    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: {
        value: {type: Boolean, default: false},
        validatedDateTime: {type: Date, default: null}
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin:{
        type: Boolean,
        default:false
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


//User Model Class
export const GroupMember = mongoose.model('GroupMember', groupMemberSchema);
