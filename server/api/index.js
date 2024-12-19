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

/**
 * @path /api/rooms
 */
app.use("/rooms", require("./routes/rooms"));

/**
 * @path /api/messages
 */
app.use("/messages", require("./routes/messages"));

/**
 * @path /api/notifications
 */
app.use("/notifications", require("./routes/notifications"));

/**
 * @path /api/settings
 */
app.use("/settings", require("./routes/settings"));

/**
 * @path /api/search
 */
app.use("/search", require("./routes/search"));

module.exports = app;