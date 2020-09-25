const JWT = require('jsonwebtoken');
const { User } = require('../models');
const { comparePassword } = require('../helpers/auth');

const verifySignIn = async (req, res, next) => {
  const { email, password } = req.body;
  // Find the user given the email
  const user = await User.findOne({ where: { email } });

  // Check if the password is correct
  const isMatch = await comparePassword(password, user.password);
  if (isMatch) {
    req.user = user;
    next();
  } else {
    res.sendStatus(403);
  }
};

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    const decoded = JWT.verify(req.token, process.env.AUTH_SECRET_KEY);
    const user = await User.findOne({ where: { id: decoded.sub } });
    req.user = user;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

module.exports = {
  verifyToken,
  verifySignIn,
};
