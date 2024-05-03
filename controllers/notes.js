const NoteModel = require("../models/notesModel");

// Make a new note with limitations on title and text.
const makeNote = async (noteData) => {
  try {
    if (noteData.title.length > 50) {
      throw new Error("Note title is too long 🤷‍♂️");
    }

    if (noteData.text.length > 300) {
      throw new Error("Note text is too long 🤷‍♂️");
    }

    const newNote = await NoteModel.insert({
      title: noteData.title,
      text: noteData.text,
      createdAt: noteData.createdAt,
      noteId: noteData.noteId,
    });

    return newNote;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { makeNote };
