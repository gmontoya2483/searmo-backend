import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({

    title: {
        type: String,
        index: true,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    isDeleted: {
        value: {type: Boolean, default: false},
        validatedDateTime: {type: Date, default: null}
    },
    isActive: {
        type: Boolean,
        default: true
    },
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
export const Group = mongoose.model('Group', groupSchema);
