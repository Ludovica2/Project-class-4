const mongoose = require("mongoose");

const { DB_URI } = process.env;

const connect = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log("Database connected");
    } catch (error) {
        throw error;
    }
}

const disconnect = async () => {
    try {
        await mongoose.disconnect(DB_URI);

        console.log("Database disconnected");
    } catch (error) {
        throw error;
    }
}

const models = {
    Event: require("./models/Event"),
    Post: require("./models/Post"),
    User: require("./models/User"),
    Room: require("./models/Room"),
    Message: require("./models/Message"),
    Notification: require("./models/Notification"),
}

module.exports = {
    connect,
    disconnect,
    ...models
}