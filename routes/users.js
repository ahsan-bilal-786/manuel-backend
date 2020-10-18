var router = require('express-promise-router')();
const path = require('path');
const multer = require('multer');
const {
  createUser,
  loginUser,
  verifyUser,
  getUserProfile,
  uploadUserPhoto,
} = require('../controllers/user');
const {
  verifySignupCred,
  verifyToken,
  verifySignIn,
} = require('../middleware/auth');

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(__dirname, '../uploads/'));
  },
  filename(req, file, callback) {
    callback(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

router.route('/login').post(verifySignIn, loginUser);
router.route('/verifySignupCred').post(verifySignupCred, (req, res) => {
  res.status(200).json(true);
});
router.route('/verify').post(verifyToken, verifyUser);
router
  .route('/photo')
  .post(verifyToken, upload.single('image'), uploadUserPhoto);
router
  .route('/')
  .post(verifySignupCred, createUser)
  .get(verifyToken, getUserProfile);

module.exports = router;
