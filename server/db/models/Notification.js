const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: null,
    },
    is_read: {
        type: Boolean,
        default: false,
    },
}, { strict: true, timestamps: true, versionKey: false });

const Notification = model("Notification", NotificationSchema);

module.exports = Notification;