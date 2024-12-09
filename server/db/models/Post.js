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
    content: {
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
}, { strict: true, timestamps: true, versionKey: false });

const Post = model("Post", PostSchema);

module.exports = Post;