const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { hashPassword } = require("../../utilities/auth");
const { User } = require("../../db");

/**
 * @path /api/users
 * @method POST
 */
app.post("/", async (req, res) => {
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        is_terms_accepted: Joi.boolean().required(),
        role: Joi.string().valid("user", "business").optional(),
        metadata: Joi.object().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.password = hashPassword(data.password);

        const user = (await new User(data).save()).toObject();

        return res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

module.exports = app;