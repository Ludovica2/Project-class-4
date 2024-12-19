const { Schema, model } = require("mongoose");

const SettingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    darkMode: {
        type: Boolean,
        dafault: false,
    },
    notify: {
        type: Boolean,
        dafault: false,
    },
    lang: {
        type: String,
        default: "it",
    },
    social: {
        type: Object,
        default: null,
    },
    device: {
        type: Object,
        default: null,
    },
}, { strict: true, timestamps: true, versionKey: false });

const Setting = model("Setting", SettingSchema);

module.exports = Setting;