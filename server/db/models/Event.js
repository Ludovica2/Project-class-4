const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: null,
    },
    cover_img: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    end: {
        type: Date,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const Event = model("Event", EventSchema);

module.exports = Event;