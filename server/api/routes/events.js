const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { authUser } = require("../../middleware/auth");
const { Event } = require("../../db");

/**
 * @path /api/events
 * @method POST
 */
app.post("/", authUser(), async (req, res) => {
    const user = req.user;
    const schema = Joi.object().keys({
        post: Joi.string().optional(),
        title: Joi.string().required(),
        description: Joi.string().optional(),
        start: Joi.date().required(),
        end: Joi.date().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.user = user._id;

        const event = (await new Event(data).save()).toObject();

        return res.status(201).json({ event });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/events
 * @method GET
 */
app.get("/", authUser(), async (req, res) => {
    const user = req.user;

    try {
        const events = await Event.find({ user: user._id }, null, { lean: true }).populate("post");

        return res.status(201).json(events);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/events/:id
 * @method PUT
 */
app.put("/:id", authUser(), async (req, res) => {
    const user = req.user;
    const _id = req.params.id;
    const schema = Joi.object().keys({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        start: Joi.date().required(),
        end: Joi.date().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Event.updateOne({ _id, user: user._id }, data);

        return res.status(200).json({ message: "Event updated" });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/events/:id
 * @method DELETE
 */
app.delete("/:id", authUser(), async (req, res) => {
    const user = req.user;
    const _id = req.params.id;

    try {

        await Event.deleteOne({ _id, user: user._id });

        return res.status(200).json({ message: "Event deleted" });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

module.exports = app;