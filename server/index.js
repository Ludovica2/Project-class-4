require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const db = require("./db");
const socket = require("./utilities/socket");

app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

const { SERVER_PORT } = process.env;

db.connect();
socket.connect(app);

app.listen(SERVER_PORT, () => {
    console.log(`Server up and running on port ${SERVER_PORT}`);
});