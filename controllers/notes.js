const NoteModel = require("../models/notesModel");

const makeNote = async (noteData) => {
  try {
    const newNote = await NoteModel.insert(noteData);
    return newNote;
  } catch (error) {
    throw new Error("Could not create note");
  }
};

module.exports = { makeNote };
