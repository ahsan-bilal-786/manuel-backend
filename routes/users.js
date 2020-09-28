var router = require('express-promise-router')();
const {
  createUser,
  loginUser,
  verifyUser,
  getUserProfile,
} = require('../controllers/user');
const { verifyToken, verifySignIn } = require('../middleware/auth');

router.route('/login').post(verifySignIn, loginUser);
router.route('/verify').post(verifyToken, verifyUser);
router.route('/').post(createUser).get(verifyToken, getUserProfile);

module.exports = router;
