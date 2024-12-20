const multer = require('multer');
const fs = require('fs');
const path = require('path');

/**
 * Middleware to upload user avatar
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 * @returns {void}
 */
const uploadAvatar = async (req, res, next) => {
    const user = req.user;
    const upload = multer({ dest: path.join(__dirname, `../uploads/${user._id}/avatar`) }).single('avatar');

    return upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        return next();
    });
}

/**
 * Middleware to upload post images
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {void}
 */
const uploadPostImages = async (req, res, next) => {
    const user = req.user;
    const post = req.post
    const upload = multer({ dest: path.join(__dirname, `../uploads/${user._id}/posts/${post._id}`) }).array('images');

    // If directory with post id does not exist, create it
    const postDir = path.join(__dirname, `../uploads/${user._id}/posts/${post._id}`);
    if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
    }

    return upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        return next();
    });
}

module.exports = {
    uploadAvatar,
    uploadPostImages,
};