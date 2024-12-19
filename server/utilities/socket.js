const { Server } = require('socket.io');
const { verifyToken } = require('./auth');
const { Message, User } = require('../db');

const io = new Server({
    cors: {
        // origin: "http://localhost:5173",
        origin: "*",
    }
});

/**
 * Connects the socket server to the app
 * @param {Express} app 
 * @returns {void} 
 */
const connect = (app) => {
    io.use((socket, next) => {
        const { token: bearerToken } = socket.request.headers;

        if (!bearerToken) {
            return next(new Error("Authentication error"));
        }

        const token = bearerToken.split(" ")[1];
        
        try {
            const decoded = verifyToken(token);
            socket.user = decoded;
            return next();
        } catch (error) {
            console.log(error);
            return next(new Error("Authentication error"));   
        }
    });
    
    io.on('connection', async (socket) => {
        // Join to personal room of the user by the user's id
        socket.join(socket.user.id);
        // Set online status
        const user = await User.findOneAndUpdate({ _id: socket.user.id }, { chat_status: "online" });

        io.emit('new-user-online', { user });
        
        // A new chat message is received
        socket.on('new-chat-message', async ({ room, to, message }) => {
            try {
                const newMessage = (await new Message({ room, from: socket.user.id, to, message }).save()).toObject();

                io.emit('new-chat-message', { ...newMessage });
            } catch (error) {
                console.error(error);
                io.emit('chat-error', { message: "Something went wrong, try to reload the page" });
            }
        });

        // A new notification is received
        socket.on('new-notification', async ({ image, title, content, from, link }) => {
            try {
                const newNotification = (await new Notification({ user: socket.user.id, image, title, content, from, link }).save()).toObject();

                io.emit('new-notification', { ...newNotification });
            } catch (error) {
                console.error(error);
                io.emit('notification-error', { message: "Something went wrong, try to reload the page" });
            }
        });

        socket.on('read-messages', async ({ room }) => {
            try {
                await Message.updateMany({ room, to: socket.user.id, is_read: false }, { is_read: true });

                io.emit('read-messages', { room });
            } catch (error) {
                console.error(error);
                io.emit('notification-error', { message: "Something went wrong, try to reload the page" });
            }
        });

        socket.on('write-message', async ({ room, user }) => {
            try {
                io.emit('write-message', { room, user });
            } catch (error) {
                console.error(error);
                io.emit('notification-error', { message: "Something went wrong, try to reload the page" });
            }
        });

        socket.on('disconnect', async () => {
            // Leave the room
            socket.leave(socket.user.id);
            // Set offline status
            const user = await User.findOneAndUpdate({ _id: socket.user.id }, { chat_status: "offline" });

            io.emit('new-user-offline', { user });
        });
    });
    
    io.listen(process.env.SOCKET_PORT || 3031);

    app.use((req, _, next) => {
        req.io = io;
        next();
    });

    console.log(`Socket server up and running on port ${process.env.SOCKET_PORT || 3031}`);
}

module.exports = {
    connect,
    io,
}