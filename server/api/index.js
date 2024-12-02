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

/**
 * @path /api/me
 */
app.use("/me", require("./routes/me"));

/**
 * @path /api/business
 */
app.use("/business", require("./routes/business"));

/**
 * @path /api/events
 */
app.use("/events", require("./routes/events"));

module.exports = app;