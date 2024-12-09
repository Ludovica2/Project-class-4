const { Schema, model } = require("mongoose");

const TypePostSchema = new Schema({
    value: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const TypePost = model("TypePost", TypePostSchema);

module.exports = TypePost;