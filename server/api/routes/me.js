const express = require("express");
const app = express.Router();

const { authUser } = require("../../middleware/auth");

/**
 * @path /api/me
 * @method POST
 */
app.get("/", authUser(), async (req, res) => {
    try {
        return res.status(200).json({ ...req.user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
});

module.exports = app;