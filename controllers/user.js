const randomstring = require('randomstring');
const { generateJWToken, hashPassword } = require('../helpers/auth');
const { User } = require('../models');
const { sendVerificationEmail } = require('../helpers/sendEmail');

const createUser = async (req, res, next) => {
  let payload = req.body;
  let user = await User.findOne({ where: { email: payload.email } });

  if (user !== null)
    return res.status(500).send({
      errors: { email: 'A user has already registered with this email.' },
    });

  payload.password = await hashPassword(payload.password);
  payload.isVerified = false;
  payload.verificationCode = randomstring.generate();
  user = await User.create(payload);

  sendVerificationEmail(
    payload.verificationCode,
    payload.email,
    'Verification Code'
  );

  if (!(user && user.id))
    return res
      .status(500)
      .send({ errors: { message: 'Unable to process the request.' } });

  const token = generateJWToken(user);
  const { id, name, email, password, contact, avatar } = user;
  res.status(201).json({
    token,
    id,
    name,
    email,
    password,
    contact,
    avatar,
  });
};

const loginUser = async (req, res, next) => {
  const token = generateJWToken(req.user);
  const { id, name, email, contact, avatar } = req.user;
  res.status(200).json({
    token,
    id,
    name,
    email,
    contact,
    avatar,
  });
};

const verifyUser = async (req, res, next) => {
  if (req.user.verificationCode === req.body.verificationCode) {
    res.status(200).json({
      isVerified: true,
    });
  } else {
    res.status(403).json({
      isVerified: false,
    });
  }
};

const getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports = {
  createUser,
  loginUser,
  verifyUser,
  getUserProfile,
};
