const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }],
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const Room = model("Room", RoomSchema);

module.exports = Room;