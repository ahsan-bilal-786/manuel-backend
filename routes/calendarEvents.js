var router = require('express-promise-router')();
const path = require('path');
const multer = require('multer');
const {
  fetchEvent,
  fetchAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/calendarEvents');
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

router.route('/:eventId').get(verifyToken, fetchEvent)
.put(verifyToken, updateEvent)
.delete(verifyToken, deleteEvent);

router.route('/').get(verifyToken, fetchAllEvents)
.post(verifyToken, createEvent)


module.exports = router;
