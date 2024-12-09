const express = require("express");
const app = express.Router();

const { authUser } = require("../../middleware/auth");
const { Message } = require("../../db");

/**
 * @path /api/messages
 * @method GET
 */
app.get("/", authUser(), async (req, res) => {
    const user = req.user;

    try {
        const messages = await Message.find({ $or: [{ from: user._id }, { to: user._id }] }, null, { lean: true }).populate({ path: "from", select: "first_name last_name avatar" }).populate({ path: "to", select: "first_name last_name avatar" });

        return res.json(messages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = app;