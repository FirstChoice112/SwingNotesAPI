const NoteModel = require("../models/notesModel");
const uuid = require("uuid");
const moment = require("moment");
const notesController = require("../controllers/notes");
const { makeNote } = require("../controllers/notes");
//Get endpoint to get all notes
const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const notes = await NoteModel.getAllNotes(userId);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Funktion för att formatera datum till "HH:mm"
function formatTime(date) {
  return moment(date).format("HH:mm");
}

//Post endpoint to create a new note
const createNote = async (req, res) => {
  try {
    const { title, text } = req.body;
    console.log(req.body);
    const id = uuid.v4();
    const createdAt = formatTime(new Date());

    const newNote = await makeNote({
      id,
      title,
      text,
      createdAt,
    });
    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//Put endpoint to update a note
const updateNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    // const modifiedAt = formatTime(new Date());
    const updatedNote = await NoteModel.updateNote(
      userId,
      req.params.id,
      req.body
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete endpoint to delete a note
const deleteNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    await NoteModel.deleteNote(userId, id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
