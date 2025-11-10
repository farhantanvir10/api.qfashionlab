const adminModel = require('../model/admin.model');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await adminModel.findById(decode.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ msg: 'User not found' });
            }
            next();
        } catch (e) {
            return res.status(401).json({ err: e.message });
        }
    }
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
};

module.exports = { protect };
