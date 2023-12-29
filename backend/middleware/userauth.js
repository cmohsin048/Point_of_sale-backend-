const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid user" });
    }
};

const checkUserRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.headers.userrole)) {
            next();
        } else {
            res.status(403).json({ error: 'Access forbidden for this role' });
        }
    };
};



module.exports={authenticateUser,checkUserRole}