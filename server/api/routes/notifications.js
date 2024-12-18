const express = require("express");
const app = express.Router();

const { authUser } = require("../../middleware/auth");
const { Notification } = require("../../db");

/**
 * @path /api/notifications?page=1&limit=10
 * @method GET
 */
app.get("/", authUser(), async (req, res) => {
    const user = req.user;
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    try {
        const notifications = await Notification.find({ user: user._id }, null, { lean: true, sort: { createdAt: -1 }, skip: skip, limit: limit || 10 }).populate("from", "first_name last_name nickname avatar metada");

        return res.json(notifications);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @path /api/notifications
 * @method POST
 */
app.post("/", authUser(), async (req, res) => {
    const from = req.user;

    const schema = Joi.object({
        user: Joi.string().required(),
        image: Joi.string().optional(),
        title: Joi.string().required(),
        content: Joi.string().required(),
        link: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const notification = (await new Notification({ from: from._id, ...data }).save()).toObject();

        // Send real time notification to user
        req.io.to(data.user).emit("new-notification", notification);

        return res.json(notification);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = app;