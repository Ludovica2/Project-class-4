const { Schema, model } = require("mongoose");

const PostFavoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const PostFavorite = model("PostFavorite", PostFavoriteSchema);

module.exports = PostFavorite;