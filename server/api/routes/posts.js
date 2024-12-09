const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { parsePostContent } = require("../../utilities/parse");
const { authUser } = require("../../middleware/auth");
const { uploadPostImages } = require("../../middleware/users");
const { Post } = require("../../db");

/**
 * @path /api/posts
 * @method POST
 */
app.post("/", authUser(), async (req, res, next) => {
    const from = req.user;

    const schema = Joi.object().keys({
        user: Joi.string().valid(null).optional(),
        content: Joi.string().required(),
        images: Joi.array().items(Joi.any()).optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const parsedData = parsePostContent(atob(data.content));

        // parsedData.images = [...parsedData.images, ...req.files.map(file => file.path)];

        const post = (await new Post({ ...parsedData, from: from._id }).save()).toObject();

        req.post = post;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}, uploadPostImages, async (req, res) => {
    const post = req.post;

    try {
        if (req.files) {
            post.images = [...post.images, ...req.files.map(file => file.path)];
    
            await Post.updateOne({ _id: post._id }, { images: post.images });
        }

        return res.status(201).json({ post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @path /api/posts
 * @method GET
 */
app.get("/", authUser(), async (req, res) => {
    const user = req.user;

    try {
        const posts = await Post.find({ user: user._id }, null, { lean: true, sort: { createdAt: -1 } }).populate({ path: "from", select: "first_name last_name avatar" });

        return res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = app;