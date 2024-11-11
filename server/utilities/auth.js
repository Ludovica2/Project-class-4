const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SERVER_SECRET_KEY } = process.env;

const hashPassword = (password) => {
    return bcrypt.hashSync(password);
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const generateToken = (payload) => {
    return jwt.sign(payload, SERVER_SECRET_KEY);
}

const verifyToken = (token) => {
    return jwt.verify(token, SERVER_SECRET_KEY);
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
}