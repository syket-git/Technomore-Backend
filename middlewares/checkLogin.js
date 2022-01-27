const jwt = require('jsonwebtoken');

//** Check login or not */

const checkLogin = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const { userId, userName } = decode;

      req.userId = userId;
      req.userName = userName;

      next();
    } else {
      next('Authorization failed!');
    }
  } catch (err) {
    next('Authorization failed!');
  }
};

module.exports = checkLogin;
