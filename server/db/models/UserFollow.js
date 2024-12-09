const { Schema, model } = require("mongoose");

const UserFollowSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const UserFollow = model("UserFollow", UserFollowSchema);

module.exports = UserFollow;