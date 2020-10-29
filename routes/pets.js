var router = require('express-promise-router')();
const path = require('path');
const multer = require('multer');
const {
  fetchPetProfile,
  fetchAllPets,
  createPet,
  updatePet,
  deletePet,
} = require('../controllers/pet');
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

router.route('/:petId').get(verifyToken, fetchPetProfile)
.put(verifyToken, updatePet)
.delete(verifyToken, deletePet);

router.route('/').get(verifyToken, fetchAllPets)
.post(verifyToken, createPet);

module.exports = router;
