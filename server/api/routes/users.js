const express = require("express");
const app = express.Router();

const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const { hashPassword, comparePassword } = require("../../utilities/auth");
const { User, UserFollow, Notification, UserReview } = require("../../db");
const { authUser } = require("../../middleware/auth");
const { uploadAvatar } = require("../../middleware/users");
const { sendNotification } = require("../../utilities/notifications");

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
        const userDir = path.join(__dirname, "../../uploads/", user._id.toString());

        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
            fs.mkdirSync(path.join(userDir, "avatar"));
            fs.mkdirSync(path.join(userDir, "posts"));
            fs.mkdirSync(path.join(userDir, "events"));
        }

        return res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/profile/reviews/:user_id
 * @method POST
 */
app.post("/profile/reviews/:user_id", authUser(), async (req, res) => {
    const user = req.params.user_id;
    const author = req.user._id;

    const schema = Joi.object().keys({
        rating: Joi.number().required(),
        content: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const review = (await new UserReview({ user, author, ...data }).save()).toObject();

        return res.status(201).json(review);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/follow/:nickname
 * @method GET
 */
app.get("/follow/:nickname", authUser(), async (req, res) => {
    // const user = req.user._id;
    const nickname = req.params.nickname;

    try {
        const user = await User.findOne({ nickname }, "-password", { lean: true });

        const followers = await UserFollow.find({ user: user._id }, "follower", { lean: true }).populate({ path: "follower", select: "_id first_name last_name nickname avatar" });
        const following = await UserFollow.find({ follower: user._id }, "user", { lean: true }).populate({ path: "user", select: "_id first_name last_name nickname avatar" });

        return res.status(200).json({ ...user, followers, following });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/profile/reviews/:user_id
 * @method GET
 */
app.get("/profile/reviews/:user_id", authUser(), async (req, res) => {
    const user = req.params.user_id;

    try {
        const reviews = await UserReview.find({ user }, null, { lean: true })
            .populate({ path: "user", select: "first_name last_name avatar nickname metadata role" })
            .populate({ path: "author", select: "first_name last_name avatar nickname metadata role" });

        return res.status(201).json(reviews);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/follow
 * @method PUT
 */
app.put("/follow", authUser(), async (req, res) => {
    const follower = req.user._id;
    const schema = Joi.object().keys({
        user: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const follow = await UserFollow.countDocuments({ follower, user: data.user });

        if (follow >= 1) {
            await UserFollow.deleteOne({ follower, user: data.user });
        } else {
            await new UserFollow({ follower, user: data.user }).save();
            const dataNotification = {
                user: data.user,
                image: req.user.avatar,
                title: "New follower",
                content: req.user.role === "user" ?
                    `${req.user.first_name} ${req.user.last_name} has just followed you`
                    : `${req.user.metadata.company_name} has just followed you`,
                link: `${process.env.CLIENT_HOST}/app/profile/${req.user.nickname}`
            };
            const notification = (await new Notification({ from: follower, ...dataNotification }).save()).toObject();
            sendNotification(notification, { to: [data.user] });
        }

        return res.status(follow >= 1 ? 200 : 201).json({ message: follow >= 1 ? "User unfollowed" : "User followed" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/profile
 * @method PUT
 */
app.put("/profile", authUser(["user", "business"]), uploadAvatar, async (req, res) => {
    const _id = req.user._id;
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        tel: Joi.string().optional(),
        birth_date: Joi.string().optional(),
        nation: Joi.string().optional(),
        city: Joi.string().optional(),
        bio: Joi.string().optional(),
        metadata: Joi.object().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        if (req.file) {
            console.log(req.file);
        }

        if (data.birth_date) data.birth_date = new Date(data.birth_date);

        await User.updateOne({ _id }, data);

        return res.status(200).json({ message: "User information updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/profile/avatar
 * @method PUT
 */
app.put("/profile/avatar", authUser(["user", "business"]), uploadAvatar, async (req, res) => {
    const _id = req.user._id;
    const schema = Joi.object().keys({
        avatar: Joi.object().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        // Save file
        const _data = data.avatar.src.split(',')[1];
        const buf = Buffer.from(_data, 'base64');
        const userDir = path.join(__dirname, "../../uploads/", _id.toString(), "avatar", data.avatar.name);

        if (!fs.existsSync(path.join(__dirname, "../../uploads/", _id.toString(), "avatar"))) {
            fs.mkdirSync(path.join(__dirname, "../../uploads/", _id.toString(), "avatar"))
        }

        fs.writeFileSync(userDir, buf);

        await User.updateOne({ _id }, { avatar: `${process.env.SERVER_HOST}/static/${_id}/avatar/${data.avatar.name}` });

        return res.status(200).json({ message: "User avatar updated", avatar: `${process.env.SERVER_HOST}/static/${_id}/avatar/${data.avatar.name}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

/**
 * @path /api/users/password
 * @method PUT
 */
app.put("/password", authUser(["user", "business"]), async (req, res) => {
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
app.put("/email", authUser(["user", "business"]), async (req, res) => {
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
app.put("/nickname", authUser(["user", "business"]), async (req, res) => {
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
app.delete("/", authUser(["user", "business"]), async (req, res) => {
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