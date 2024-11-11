const express = require("express");
const app = express.Router();

/**
 * @path /api/users
 */
app.use("/users", require("./routes/users"));

/**
 * @path /api/posts
 */
app.use("/posts", require("./routes/posts"));

module.exports = app;