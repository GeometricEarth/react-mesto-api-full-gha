const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;
console.log(JWT_SECRET);

const AuthError = require('../utils/httpErrors/AuthError');

const userAuth = (req, res, next) => {
  try {
    const payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }

  return next();
};

module.exports = userAuth;
