import mongoose, { Schema } from 'mongoose';

const groupMatchSchema = new mongoose.Schema({
    group: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'

    },
    title: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 255
    },
    matchDayTime: {
        required: true,
        type: Date
    },
    playingField: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 255
    },
    playersByTeam: {
      required: true,
      type: Number
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


//GroupMember Model Class
export const GroupMatch = mongoose.model('GroupMatch', groupMatchSchema);
