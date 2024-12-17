const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { authUser } = require("../../middleware/auth");
const { Room, Message } = require("../../db");

/**
 * @path /api/rooms
 * @method GET
 */
app.get("/", authUser(), async (req, res) => {
    const user = req.user;
    
    try {
        const rooms = await Room.find({ users: user._id }, null, { lean: true }).populate({ path: "users", select: "first_name last_name metadata role avatar chat_status " });
        
        for (let room of rooms) {
            room.messages = await Message.find({ room: room._id }, null, { lean: true }).populate({ path: "from", select: "first_name last_name metadata role avatar" }).populate({ path: "to", select: "first_name last_name metadata role avatar" });
        }

        return res.json(rooms);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @path /api/rooms
 * @method POST
 */
app.post("/", authUser(), async (req, res) => {
    const user = req.user;

    const schema = Joi.object({
        to: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const room = await Room.findOne({ users: { $in: [user._id, data.to] } }, null, { lean: true });

        if (!room) {
            await new Room({ users: [user._id, data.to] }).save();
        }
        
        const rooms = await Room.find({ users: { $in: [user._id, data.to] } }, null, { lean: true }).populate({ path: "users", select: "fist_name last_name avatar chat_status " });

        return res.status(201).json(rooms);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = app;