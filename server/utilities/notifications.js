const { io } = require("./socket");

/**
 * Send a notification to a user
 * @param {Object} notification Notification object
 * @param {Object} options Options object
 * @param {Array} options.to Array of user ids to send notification
 */
const sendNotification = (notification, options = { to: [] }) => {
    options = { to: [], ...options };
    
    options.to.forEach((user) => {
        io.to(user).emit("new-notification", notification);
    });
};

module.exports = {
    sendNotification,
};