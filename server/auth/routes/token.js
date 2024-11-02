const express = require("express");
const app = express.Router();

const jwt = require("jsonwebtoken");

const users = [
    {
        id: "abc123",
        first_name: "Ilaria",
        last_name: "Mammana",
        email: "ilaria.mammana@gmail.com",
        password: "1234"
    },
    {
        id: "abc124",
        first_name: "Ludovica",
        last_name: "Spinelli",
        email: "ludovica.spinelli@gmail.com",
        password: "1234"
    },
];

app.post("/", (req, res) => {
    const data = req.body;

    const user = users.find(u => u.email == data.email);

    if (!user) return res.status(404).json({ message: "User Not Found" });

    const is_valid_password = user.password == data.password;

    if (!is_valid_password) return res.status(404).json({ message: "User Not Found" });

    const { password, ...payload } = user;

    const token = jwt.sign({ id: user.id, email: user.email, role: "user" }, process.env.SERVER_SECRET_KEY);

    return res.status(200).json({
        token, user: payload
    });

});

module.exports = app;