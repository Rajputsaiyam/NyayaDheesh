const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

module.exports = {verifyToken};
