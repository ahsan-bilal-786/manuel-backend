const JWT = require('jsonwebtoken');
const { User } = require('../models');
const { comparePassword } = require('../helpers/auth');

const verifySignupCred = async (req, res, next) => {
  let payload = req.body;
  let user = await User.findOne({ where: { email: payload.email } });

  if (user !== null)
    return res.status(500).send({
      errors: { email: 'A user has already registered with this email.' },
    });

  next();
};

const verifySignIn = async (req, res, next) => {
  const { email, password } = req.body;
  // Find the user given the email
  const user = await User.findOne({ where: { email } });
  if (!user)
    return res
      .status(401)
      .send({ errors: { message: 'User does not exist.' } });
  // Check if the password is correct
  const isMatch = await comparePassword(password, user.password);
  if (isMatch) {
    req.user = user;
    next();
  } else {
    return res.status(401).send({ errors: { message: 'Invalid password.' } });
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
  verifySignupCred,
};
