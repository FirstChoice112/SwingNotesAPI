const NoteModel = require("../models/notesModel");
const uuid = require("uuid");
const moment = require("moment");
const notesController = require("../controllers/notes");
const { makeNote } = notesController;
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

//Post endpoint to create a new note
const createNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, text } = req.body;
    const id = uuid.v4();
    const createdAt = moment().toISOString();
    const modifiedAt = createdAt;

    const newNote = await makeNote({
      id,
      title,
      text,
      createdAt,
      modifiedAt,
      userId,
    });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Put endpoint to update a note
const updateNote = async (req, res) => {
  try {
    const userId = req.user.userId;
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
