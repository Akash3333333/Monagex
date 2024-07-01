const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/User");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        
        next();
    });
};
module.exports = { authenticateUser };

