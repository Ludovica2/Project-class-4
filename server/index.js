require("dotenv").config();
const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./db");
const socket = require("./utilities/socket");
const { parsePostContent } = require("./utilities/parse");
const { authUser } = require("./middleware/auth");

app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "512mb" }));

app.use(["/static", "/uploads"], authUser(), express.static(path.join(__dirname, "./uploads")));
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.post("/post", (req, res) => {
    const post = parsePostContent(req.body.content);

    return res.status(201).json({ post });
});

const { SERVER_PORT } = process.env;

db.connect();
socket.connect(app);

app.listen(SERVER_PORT, () => {
    console.log(`Server up and running on port ${SERVER_PORT}`);
});