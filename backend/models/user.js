import { model, Schema } from 'mongoose';
import { ObjectId } from 'bson';

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    pastHashes: [
        String
    ],
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    isAdmin: {
        type: Boolean
    },
    accessToken: {
        type: String,
        index: true
    },
    likedPosts: [
        {
            type: Schema.Types.ObjectId, ref: "Post"
        }
    ],
    dislikedPosts: [
        {
            type: Schema.Types.ObjectId, ref: "Post"
        }
    ]
});

const userModel = model('User', schema);

export default userModel;