// var express = require("express");
const passport = require('passport');
var router = require('express-promise-router')();
const passportSignIn = passport.authenticate('local', { session: false });
const { createUser, loginUser, verifyUser } = require('../controllers/user');
// var router = express.Router();
/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.route('/login').post(passportSignIn, loginUser);
router.route('/verify').post(verifyUser);
router.post('/', createUser);

module.exports = router;
