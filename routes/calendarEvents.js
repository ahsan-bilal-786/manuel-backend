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

router.route('/:eventId').get(fetchEvent)
.put(updateEvent)
.delete(deleteEvent);

router.route('/').get(fetchAllEvents)
.post(createEvent)


module.exports = router;
