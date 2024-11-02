const express = require("express");
const app = express.Router();

app.use("/token", require("./routes/token"));

module.exports = app;