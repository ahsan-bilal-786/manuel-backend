var router = require('express-promise-router')();
const path = require('path');
const multer = require('multer');
const {
  fetchPost,
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/posts');

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

router.route('/:postId').get(fetchPost)
.put(updatePost)
.delete(deletePost);

router.route('/').get(fetchAllPosts)
.post(createPost)


module.exports = router;
