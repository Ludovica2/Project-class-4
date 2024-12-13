const express = require("express");
const app = express.Router();

const Joi = require("joi");
const fs = require("fs");
const path = require("path");
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

        const _post = new Post({ ...parsedData, from: from._id });

        const postDir = path.join(__dirname, `../../uploads/${from._id}/posts/`, _post._id.toString());
        
        if (!fs.existsSync(postDir)) {
            fs.mkdirSync(postDir);
        }

        for (let image of data.images) {
            const data = image.src.split(',')[1]; 
            const buf = Buffer.from(data, 'base64'); 
            fs.writeFileSync(path.join(__dirname, `../../uploads/${from._id}/posts/${_post._id}/${image.name}`), buf);
            if (!parsedData.images) parsedData.images = [];
            parsedData.images.push(`${process.env.SERVER_HOST}/static/${from._id}/posts/${_post._id}/${image.name}`);
        }
        
        if (!_post.images) _post.images = parsedData.images;
        else _post.images.push(...parsedData.images);

        // parsedData.images = [...parsedData.images, ...req.files.map(file => file.path)];

        const post = (await _post.save()).toObject();

        return res.status(201).json(post);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/posts
 * @method GET
 */
app.get("/", authUser(), async (_, res) => {
    try {
        const posts = await Post.find({}, null, { lean: true, sort: { createdAt: -1 } })
            .populate({ path: "from", select: "first_name last_name nickname createdAt avatar" })
            .populate({ path: "post_likes" })
            .populate({ path: "post_comments", populate: ["reply_to", "reactions"] });

        return res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @path /api/posts/:user_id
 * @method GET
 */
app.get("/:user_id", authUser(), async (req, res) => {
    const user = req.params.user_id;
    try {
        const posts = await Post.find({ $or: [{ user }, { from: user }] }, null, { lean: true, sort: { createdAt: -1 } })
            .populate({ path: "from", select: "first_name last_name nickname createdAt avatar" })
            .populate({ path: "post_likes" })
            .populate({ path: "post_comments", populate: ["reply_to", "reactions"] });

        return res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = app;