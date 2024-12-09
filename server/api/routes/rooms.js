const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { authUser } = require("../../middleware/auth");
const { Room } = require("../../db");

/**
 * @path /api/rooms
 * @method GET
 */
app.get("/", authUser(), async (req, res) => {
    const user = req.user;
    
    try {
        const rooms = await Room.find({ users: user._id }, null, { lean: true }).populate({ path: "users", select: "-password" });

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
    const schema = Joi.object({
        users: Joi.array().items(Joi.string().required()).min(2).required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const room = (await new Room({ users: data.users }).save()).toObject();

        return res.json(room);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = app;