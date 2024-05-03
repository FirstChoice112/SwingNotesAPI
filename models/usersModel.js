const Datastore = require("nedb-promise");
const path = require("path");

//Create and init database
const databaseFolderPath = path.join(__dirname, "../database");
const usersDbFilePath = path.join(databaseFolderPath, "users.db");
const usersDb = new Datastore({ filename: usersDbFilePath, autoload: true });

module.exports = usersDb;
