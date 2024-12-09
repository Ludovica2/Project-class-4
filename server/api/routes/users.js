const express = require("express");
const app = express.Router();

const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const { hashPassword, comparePassword } = require("../../utilities/auth");
const { User } = require("../../db");
const { authUser } = require("../../middleware/auth");
const { uploadAvatar } = require("../../middleware/users");

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
        nickname: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.password = hashPassword(data.password);
        data.nickname = data.nickname ? data.nickname : data.email.split("@")[0];

        const user = (await new User(data).save()).toObject();

        // if directory uploads/${user._id} does not exist, create it with inside avatar and posts directories
        const userDir = path.join(__dirname, "../../uploads/", user._id);

        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
            fs.mkdirSync(path.join(userDir, "avatar"));
            fs.mkdirSync(path.join(userDir, "posts"));
        }

        return res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/profile
 * @method PUT
 */
app.put("/profile", authUser(["user"]), uploadAvatar, async (req, res) => {
    const _id = req.user._id;
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        avatatar: Joi.any().optional(),
        tel: Joi.string().optional(),
        birth_date: Joi.string().optional(),
        nation: Joi.string().optional(),
        city: Joi.string().optional(),
        bio: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        if (data.birth_date) data.birth_date = new Date(data.birth_date);

        await User.updateOne({ _id }, data);

        return res.status(200).json({ message: "User information updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/password
 * @method PUT
 */
app.put("/password", authUser(["user"]), async (req, res) => {
    const _id = req.user._id;
    const schema = Joi.object().keys({
        current_password: Joi.string().required(),
        new_password: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const { password: hash } = await User.findOne({ _id }, "password", { lean: true });

        if (!comparePassword(data.current_password, hash)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const password = hashPassword(data.new_password);

        await User.updateOne({ _id }, { password });

        return res.status(200).json({ message: "User password updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/email
 * @method PUT
 */
app.put("/email", authUser(["user"]), async (req, res) => {
    const _id = req.user._id;
    const schema = Joi.object().keys({
        email: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await User.updateOne({ _id }, data);

        return res.status(200).json({ message: "User email updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
});

/**
 * @path /api/users/nickname
 * @method PUT
 */
app.put("/nickname", authUser(["user"]), async (req, res) => {
    const _id = req.user._id;
    const schema = Joi.object().keys({
        nickname: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await User.updateOne({ _id }, data);

        return res.status(200).json({ message: "User nickname updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Nickname already taken" })
    }
});

/**
 * @path /api/users
 * @method DELETE
 */
app.delete("/", authUser(["user"]), async (req, res) => {
    const _id = req.user._id;

    try {
        await User.deleteOne({ _id });

        return res.status(200).json({ message: "User account deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
});

module.exports = app;