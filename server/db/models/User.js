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
    full_name: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: `${process.env.SERVER_HOST}/static/default/avatar/profile.png`,
    },
    birth_date: {
        type: Date,
        default: null,
    },
    nation: {
        type: String,
        default: null,
    },
    city: {
        type: String,
        default: null,
    },
    tel: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: null,
    },
    image_user: {
        type: String,
        default: null
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
    chat_status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline",
    },
}, { strict: true, timestamps: true, versionKey: false });

UserSchema.pre("save", function (next) {
    this.full_name = `${this.first_name} ${this.last_name}`.trim();
    next();
});

const User = model("User", UserSchema);

module.exports = User;