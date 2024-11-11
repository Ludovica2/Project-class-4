const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { parsePostContent } = require("../../utilities/parse");

/**
 * @path /api/posts
 * @method POST
 */
app.post("/", async (req, res) => {
    const schema = Joi.object().keys({
        content: Joi.string().required(),
        /* tags: Joi.array().items(Joi.string()).optional(),
        mentions: Joi.array().items(Joi.string()).optional(),
        images: Joi.array().items(Joi.string()).optional(),
        videos: Joi.array().items(Joi.string()).optional(),
        map: Joi.object().keys({
            pins: Joi.array().items(Joi.object().keys({
                user: Joi.string().required(),
                label: Joi.string().required(),
                lat: Joi.number().required(),
                lon: Joi.number().required(),
            })).optional(),
            address: Joi.string(),
        }).optional(), */
    });

    try {
        const data = await schema.validateAsync(req.body);

        const parsedData = parsePostContent(atob(data.content));

        return res.status(200).json({ post: parsedData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

module.exports = app;