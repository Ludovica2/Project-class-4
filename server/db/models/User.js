const { required } = require("joi");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    metadata: {
        type: Object,
        default: {}
    },
    role: {
        type: String,
        enum: ["user", "business"],
        default: "user"
    },
    is_terms_accepted: {
        type: Boolean,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_verified: {
        type: Boolean,
        default: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const User = model("User", UserSchema);

module.exports = User;