const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { User } = require("../../db");
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
    
        return res.status(200).json({ token, user: payload });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Errore interno del server" });   
    }
});

module.exports = app;