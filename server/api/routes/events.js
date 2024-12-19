const express = require("express");
const app = express.Router();

const fs = require("fs");
const path = require("path");
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
        cover_image: Joi.object().optional(),
        title: Joi.string().required(),
        description: Joi.string().optional(),
        start: Joi.date().required(),
        end: Joi.date().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.user = user._id;

        if (data.cover_image) {
            const { cover_image, ...payload } = data;

            const event = new Event(payload);

            if (!fs.existsSync(path.join(__dirname, "../../uploads", user._id.toString(), "events", event._id.toString()))) {
                fs.mkdirSync(path.join(__dirname, "../../uploads", user._id.toString(), "events", event._id.toString()), { recursive: true });
            }

            const buf = Buffer.from(cover_image.src.split(',')[1], 'base64'); 
            fs.writeFileSync(path.join(__dirname, "../../uploads", user._id.toString(), "events", event._id.toString(), cover_image.name), buf);

            event.cover_img = `${process.env.SERVER_HOST}/static/${user._id.toString()}/events/${event._id.toString()}/${cover_image.name}`;

            const _event = (await event.save()).toObject();

            return res.status(201).json({ event: _event });
        } else {
            const event = (await new Event(data).save()).toObject();
            
            return res.status(201).json({ event });
        }
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
        const events = await Event.find({ $or: [{ user: user._id }, { refs: user._id }] }, null, { lean: true }).populate("post");

        return res.status(201).json(events);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/events/:id
 * @method PATCH
 */
app.patch("/:id", authUser(), async (req, res) => {
    const user = req.user;
    const _id = req.params.id;

    try {
        await Event.updateOne({ _id }, { refs: user._id });

        return res.status(200).json({ message: "Event updated" });
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
        cover_image: Joi.object().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const { cover_image, ...payload } = data; 

        if (cover_image) {
            if (!cover_image.src.startsWith("http")) {
                if (!fs.existsSync(path.join(__dirname, "../../uploads", user._id.toString(), "events", _id.toString()))) {
                    fs.mkdirSync(path.join(__dirname, "../../uploads", user._id.toString(), "events", _id.toString()), { recursive: true });
                }

                const buf = Buffer.from(cover_image.src.split(',')[1], 'base64'); 
                fs.writeFileSync(path.join(__dirname, "../../uploads", user._id.toString(), "events", _id.toString(), cover_image.name), buf);
    
                payload.cover_img = `${process.env.SERVER_HOST}/static/${user._id.toString()}/events/${_id.toString()}/${cover_image.name}`;    
            } else {
                payload.cover_img = cover_image.src.split("?")[0];
            }
        } else {
            payload.cover_img = null;
        }

        await Event.updateOne({ _id, user: user._id }, payload);

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