//Laddar in fs, path nedb-promise och dotenv.
const fs = require("fs");
const path = require("path");
const Datastore = require("nedb-promise");
require("dotenv").config();

//Importera express modulen och skapar en express-app.
const express = require("express");
const app = express();

//Middleware för att tolka JSON-förfrågningar
app.use(express.json());

//Tilldelar värdet av variabeln PORT och BASE_URL från miljövbariablerna i env.
const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

//Sökväg till databasmappen.
const databaseFolderPath = path.join(__dirname, "database");

//initiera databasen för användaren.
const usersDbFilePath = path.join(databaseFolderPath, "users.db");
const usersDb = new Datastore({ filename: usersDbFilePath, autoload: true });
// Initiera databasen för anteckningar
const notesDbFilePath = path.join(databaseFolderPath, "notes.db");
const notesDb = new Datastore({ filename: notesDbFilePath, autoload: true });

//Startar min Express-server.
app.listen(PORT, () => {
  console.log(`Listening to the server! 😀 and running at ${BASE_URL}:${PORT}`);
});
