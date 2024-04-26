const Datastore = require("nedb-promise");
const path = require("path");

//Skapa upp och initiera databasen.
const databaseFolderPath = path.join(__dirname, "../database");
const usersDbFilePath = path.join(databaseFolderPath, "users.db");
const usersDb = new Datastore({ filename: usersDbFilePath, autoload: true });

module.exports = usersDb;
