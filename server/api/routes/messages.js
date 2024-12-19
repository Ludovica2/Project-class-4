const express = require("express");
const app = express.Router();

const { authUser } = require("../../middleware/auth");
const { Message, Notification } = require("../../db");
const { io } = require("../../utilities/socket");
const Joi = require("joi");

/**
 * @path /api/messages/:room_id
 * @method GET
 */
app.get("/:room_id", authUser(), async (req, res) => {
    const user = req.user;
    const room = req.params.room_id;

    try {
        const messages = await Message.find({ room, $or: [{ from: user._id }, { to: user._id }] }, null, { lean: true }).populate({ path: "from", select: "first_name last_name avatar" }).populate({ path: "to", select: "first_name last_name avatar" });

        return res.json({ room, messages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @path /api/messages/:room_id
 * @method POST
 */
app.post("/:room_id", authUser(), async (req, res) => {
    const user = req.user;
    const room = req.params.room_id;

    const schema = Joi.object({
        to: Joi.string().required(),
        message: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const _message = ((await new Message({ room, from: user._id, to: data.to, message: data.message }).save())).toObject();

        const message = await Message.findOne({ _id: _message._id }, null, { lean: true })
            .populate({ path: "from", select: "first_name last_name avatar" })
            .populate({ path: "to", select: "first_name last_name avatar" });

        // create notification for user
        const dataNotification = {
            user: message.to._id,
            image: message.to.avatar,
            title: "New chat message",
            content: `${message.to.first_name} ${message.to.last_name} has just send a new message`,
            link: `${process.env.CLIENT_HOST}/app/chat?recipient=${message.to._id}`
        };
        const notification = (await new Notification({ from: user._id, ...dataNotification }).save()).toObject();

        io.to(data.to).emit("new-chat-message", { room, message, notification });

        return res.status(201).json(message);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = app;