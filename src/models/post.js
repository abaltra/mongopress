import { model, Schema } from 'mongoose';

const schema = new Schema({
    slug: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    published: {
        type: Boolean
    },
    hidden: {
        type: Boolean
    },
    body: {
        type: String
    },
    comments: [
        {
            user: {
                type: String
            },
            body: {
                type: String
            },
            createdAt: {
                type: Date
            }
        }
    ],
    stats: {
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        }
    }
});

const postModel = model('Post', schema);

export default postModel;