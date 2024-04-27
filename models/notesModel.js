const Datastore = require("nedb-promise");
const path = require("path");

//Skapa upp och initiera databasen.
const databaseFolderPath = path.join(__dirname, "../database");
const notesDbFilePath = path.join(databaseFolderPath, "notes.db");
const notesDb = new Datastore({ filename: notesDbFilePath, autoload: true });
module.exports = notesDb;
