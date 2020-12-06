const randomstring = require('randomstring');
const { generateJWToken, hashPassword } = require('../helpers/auth');
const { User, Pet } = require('../models');
const { sendVerificationEmail } = require('../helpers/sendEmail');

const createUser = async (req, res, next) => {
  let payload = req.body;
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
  const { id, name, email, contact, avatar, isVerified } = req.user;
  res.status(200).json({
    token,
    id,
    name,
    email,
    contact,
    avatar,
    isVerified,
  });
};

const verifyUser = async (req, res, next) => {
  if (req.user.verificationCode === req.body.verificationCode) {
    req.user.update({ isVerified: true });
    res.status(200).json({
      isVerified: true,
    });
  } else {
    return res.status(500).send({
      errors: {
        verificationCode: 'Verification Code is invalid.',
      },
    });
  }
};

const getUserProfile = async (req, res, next) => {
  const pets = await Pet.findAll({
    where: {
      userId: req.user.id
    }
  });
  const { id, name, email, contact, avatar, isVerified } = req.user;
  res.status(200).json({
    id,
    name,
    email,
    contact,
    avatar,
    isVerified,
    pets
  });
};

const uploadUserPhoto = async (req, res, next) => {
  if (req.file.filename) {
    const data = { avatar: `/uploads/${req.file.filename}` };
    req.user.update(data);
    res.status(200).json(data);
  } else {
    return res.status(500).send({
      errors: {
        avatar: 'Image Upload Failed. Please try again later.',
      },
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  verifyUser,
  getUserProfile,
  uploadUserPhoto,
};
