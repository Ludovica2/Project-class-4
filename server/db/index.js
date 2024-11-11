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
    User: require("./models/User"),
    Post: require("./models/Post"),
}

module.exports = {
    connect,
    disconnect,
    ...models
}