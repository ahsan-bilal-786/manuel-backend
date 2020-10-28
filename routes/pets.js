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

router.route('/:petId').get(fetchPetProfile)
.put(updatePet)
.delete(deletePet);

router.route('/').get(fetchAllPets)
.post(createPet);

module.exports = router;
