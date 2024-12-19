const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { hashPassword } = require("../../utilities/auth");
const { User, Setting } = require("../../db");
const { authUser } = require("../../middleware/auth");

/**
 * @path /api/settings
 * @method GET
 */
app.get("/", authUser(), async (req, res) => {
    const user = req.user;
    
    try {
        let settings = await Setting.findOne({ user: user._id }, null, { lean: true });

        if (!settings) {
            settings = await new Setting({ user: user._id }).save();
        }

        return res.status(201).json(settings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/settings
 * @method PUT
 */
app.put("/", authUser(), async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        darkMode: Joi.boolean().optional(),
        notify: Joi.boolean().optional(),
        lang: Joi.string().optional(),
        social: Joi.object().optional(),
        device: Joi.object().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Setting.updateOne({ user: user._id }, data);

        return res.status(201).json({ message: "Settings updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = app;