const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next();
  } else {
    req.user = {};
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user.email = decoded.email;
      req.user.isAuthenticated = true;
      next();
    } catch {
      req.user.isAuthenticated = false;
      next();
    }
  }
}

module.exports = {
  authMiddleware,
};
