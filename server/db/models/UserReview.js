const { Schema, model } = require("mongoose");

const UserReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const UserReview = model("UserReview", UserReviewSchema);

module.exports = UserReview;