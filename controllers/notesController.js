const Note = require('../models/note');

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  const note = new Note({
    user: req.user._id,
    title,
    content,
  });

  const createdNote = await note.save();
  res.status(201).json(createdNote);
};

exports.updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  const updatedNote = await note.save();
  res.json(updatedNote);
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  if (note) {
    await note.remove();
    res.json({ message: 'Note removed' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
};
