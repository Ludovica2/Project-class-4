const { User } = require("../db");
const { verifyToken } = require("../utilities/auth");

const authUser = (roles = null) => async (req, res, next) => {
    const bearer = req.headers.authorization || req.headers["Authorization"] || req.query.token || false;

    if (!bearer) return res.status(403).json({ message: "Not authorized" });
    
    const token = req.query.token ? bearer : bearer.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Not authorized" });

    try {
        const decoded = verifyToken(token);

        if (!decoded) return res.status(403).json({ message: "Not authorized" });

        if (roles && roles.indexOf(decoded.role) === -1) return res.status(403).json({ message: "Not authorized" });

        const user = await User.findOne({ _id: decoded.id }, "-password", { lean: true });

        if (!user) return res.status(403).json({ message: "Not authorized" });

        req.user = user;
        return next();
    } catch(error) {
        console.log(error);
        return res.status(403).json({ message: "Not authorized" });
    }
}

module.exports = {
    authUser,
}