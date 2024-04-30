const NoteModel = require("../models/notesModel");

const makeNote = async (noteData) => {
  try {
    const newNote = await NoteModel.insert({
      title: noteData.title,
      text: noteData.text,
      createdAt: noteData.createdAt,
      id: noteData.id,
    });
    console.log(newNote);
    return newNote;
  } catch (error) {
    throw new Error("Could not create note 😒");
  }
};

module.exports = { makeNote };
