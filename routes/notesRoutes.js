const NoteModel = require("../models/notesModel");
const uuid = require("uuid");
const { formatTime } = require("../utils/utils");
const { makeNote } = require("../controllers/notes");
const UsersModel = require("../models/usersModel");

//Get endpoint to get all notes
const getAllNotes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UsersModel.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found 🥲" });
    }

    const notes = await NoteModel.find({ userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Post endpoint to create a new note
const createNote = async (req, res) => {
  try {
    const { title, text } = req.body;
    const userId = req.params.userId;
    const noteId = uuid.v4();
    const createdAt = formatTime(new Date());

    const newNote = await makeNote({ title, text, userId, noteId, createdAt });
    {
      title, text, userId, noteId, createdAt;
    }

    res.status(201).json({ success: true, note: { ...newNote, userId } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//Put endpoint to update a note
const updateNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, text } = req.body;
    const modifiedAt = formatTime(new Date());
    const existingNote = await NoteModel.findOne({ noteId: noteId });

    if (!existingNote) {
      return res.status(404).json({ message: "Note not found 🥲" });
    }

    // Update the note
    const updatedNote = await NoteModel.update(
      { noteId: noteId },
      { $set: { title: title, text: text, modifiedAt: modifiedAt } },
      { returnUpdatedDocs: true }
    );

    res.json({
      success: true,
      message: "Note updated successfully 😎",
      note: updatedNote,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete endpoint to delete a note
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    await NoteModel.findOne({ noteId });
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully 😎" })
      .end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
