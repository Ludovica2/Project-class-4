const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event",
        default: null,
    },
    post_type: {
        type: String,
        enum: ["basic", "event"],
        default: "basic",
    },
    post_likes: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "PostLike",
            required: false,
        }]
    },
    post_likes_count: {
        type: Number,
        default: 0,
    },
    post_comments: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "PostComment",
            required: false,
        }]
    },
    post_comments_count: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    },
    tags: {
        type: [String], // ["#food", "#pizza"]
        default: [],
    },
    mentions: {
        type: [String], // ["@ilaria", "@ludovica", "@il_corsaro_nero"]
        default: [],
    },
    urls: {
        type: [String], // ["https://...", "https://..."]
        default: [],
    },
    images: {
        type: [String], // ["https://...", "https://..."]
        default: [],
    },
    videos: {
        type: [String], // ["https://...", "https://..."]
        default: [],
    },
    map: {
        type: {
            pins: [{
                type: {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                    },
                    label: String,
                    lat: Number,
                    lon: Number,
                }
            }],
            address: {
                type: String,
            }
        },
        default: null,
    },
    locality: {
        type: String,
        default: null,
    },
    title: {
        type: String,
        default: null,
    },
    start: {
        type: Date,
        default: null,
    },
    end: {
        type: Date,
        default: null,
    },
}, { strict: true, timestamps: true, versionKey: false });

const Post = model("Post", PostSchema);

module.exports = Post;