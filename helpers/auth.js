const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    })
  );
};

const comparePassword = (plainPassword, passwordHash) => {
  return bcrypt.compare(plainPassword, passwordHash).then((isMatch) => {
    return isMatch;
  });
};

const generateJWToken = (user) => {
  return JWT.sign(
    {
      iss: "express-relational-db",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    process.env.AUTH_SECRET_KEY
  );
};

module.exports = {
  hashPassword,
  generateJWToken,
  comparePassword,
};
