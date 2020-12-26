var router = require('express-promise-router')();
const path = require('path');
const multer = require('multer');
const {
  fetchPost,
  fetchAllPosts,
  fetchAllUserPosts,
  fetchAllPetPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/post');
const {
  verifyToken,
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

router.route('/user').get(verifyToken, fetchAllUserPosts)
router.route('/pet/:petId').get(verifyToken, fetchAllPetPosts)


router.route('/:postId').get(verifyToken, fetchPost)
.put(verifyToken, updatePost)
.delete(verifyToken, deletePost);



router.route('/').get(verifyToken, fetchAllPosts)
.post(verifyToken, upload.single('avatar'), createPost)



module.exports = router;
