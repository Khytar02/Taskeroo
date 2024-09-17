const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('./tokenBlacklist');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token') || req.body.token;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ msg: 'Token is blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Set req.user to the user ID from the JWT token
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
