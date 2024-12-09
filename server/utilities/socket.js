const { Server } = require('socket.io');
const { verifyToken } = require('./auth');
const { Message, User } = require('../db');

/**
 * Connects the socket server to the app
 * @param {Express} app 
 * @returns {void} 
 */
const connect = (app) => {
    const io = new Server({
        cors: {
            // origin: "http://localhost:5173",
            origin: "*",
        }
    });

    io.use((socket, next) => {
        const { token } = socket.request.headers;

        if (!token) {
            return next(new Error("Authentication error"));
        }

        try {
            const decoded = verifyToken(token);
            socket.user = decoded;
            return next();
        } catch (error) {
            return next(new Error("Authentication error"));   
        }
    });
    
    io.on('connection', async (socket) => {
        // Join to personal room of the user by the user's id
        socket.join(socket.user._id);
        // Set online status
        await User.updateOne({ _id: socket.user._id }, { chat_status: "online" });
        
        // A new chat message is received
        socket.on('new-chat-message', async ({ room, to, message }) => {
            try {
                const newMessage = (await new Message({ room, from: socket.user._id, to, message }).save()).toObject();

                io.emit('new-chat-message', { ...newMessage });
            } catch (error) {
                console.error(error);
                io.emit('chat-error', { message: "Something went wrong, try to reload the page" });
            }
        });

        // A new notification is received
        socket.on('new-notification', async ({ image, title, content, from, link }) => {
            try {
                const newNotification = (await new Notification({ user: socket.user._id, image, title, content, from, link }).save()).toObject();

                io.emit('new-notification', { ...newNotification });
            } catch (error) {
                console.error(error);
                io.emit('notification-error', { message: "Something went wrong, try to reload the page" });
            }
        });

        socket.on('disconnect', async () => {
            // Leave the room
            socket.leave(socket.user._id);
            // Set offline status
            await User.updateOne({ _id: socket.user._id }, { chat_status: "offline" });
        });
    });
    
    io.listen(process.env.SOCKET_PORT || 3031);

    app.use((req, _, next) => {
        req.io = io;
        next();
    });
}

module.exports = {
    connect,
}