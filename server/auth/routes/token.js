const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { User, UserFollow } = require("../../db");
const { comparePassword, generateToken } = require("../../utilities/auth");

/**
 * @path /auth/token
 * @method POST
 */
app.post("/", async (req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const role = req.query.role || "user"; 

    try {
        const data = await schema.validateAsync(req.body);

        const user = await User.findOne({ email: data.email, role }, null, { lean: true });
    
        if (!user) return res.status(404).json({ message: "Utente non trovato" });
    
        const is_valid_password = comparePassword(data.password, user.password);
    
        if (!is_valid_password) return res.status(404).json({ message: "Utente non trovato" });
    
        const { password, ...payload } = user;
    
        const token = generateToken({ id: user._id, email: user.email, role: user.role });

        const followers = await UserFollow.find({ user: user._id }, "follower", { lean: true }).populate({ path: "follower", select: "_id first_name last_name nickname avatar" });
        const following = await UserFollow.find({ follower: user._id }, "user", { lean: true }).populate({ path: "user", select: "_id first_name last_name nickname avatar" });
    
        return res.status(200).json({ token, user: { ...payload, followers, following } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Errore interno del server" });   
    }
});

module.exports = app;