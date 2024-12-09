const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true
    },
}, { strict: true, timestamps: true, versionKey: false });

const Message = model("Message", MessageSchema);

module.exports = Message;