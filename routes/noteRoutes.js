const express = require('express');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(auth, getNotes).post(auth, createNote);
router.route('/:id').put(auth, updateNote).delete(auth, deleteNote);

module.exports = router;
