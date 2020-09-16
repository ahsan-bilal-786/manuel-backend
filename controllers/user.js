const { generateJWToken, hashPassword } = require("../helpers/auth");
const { User } = require("../models");

const createUser = async (req, res, next) => {
  let payload = req.body;
  let user = await User.findOne({ where: { email: payload.email } });

  if (user !== null)
    return res
      .status(500)
      .send({ message: "A user has already registered with this email." });

  payload.password = await hashPassword(payload.password);
  user = await User.create(payload);

  if (!(user && user.id))
    return res.status(500).send({ message: "Unable to process the request." });

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

module.exports = {
  createUser,
  loginUser,
};
