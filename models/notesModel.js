const Datastore = require("nedb-promise");
const path = require("path");

//Create and init database
const databaseFolderPath = path.join(__dirname, "../database");
const notesDbFilePath = path.join(databaseFolderPath, "notes.db");
const notesDb = new Datastore({ filename: notesDbFilePath, autoload: true });

module.exports = notesDb;
