//Laddar in fs, path nedb-promise och dotenv.
const Datastore = require("nedb-promise"); //behövs till mina paths senare
require("dotenv").config();

//Importera express modulen och skapar en express-app. Tar in databas-initialiseringen från models mappen
const express = require("express");
const app = express();
const router = express.Router();

const UserModel = require("./models/usersModel");
const NoteModel = require("./models/notesModel");
const userController = require("./controllers/users");

//Middleware för att tolka JSON-förfrågningar och hantera error
app.use(express.json());
// Middleware som skickar Status 400 - Bad request
app.use((err, req, res, next) => {
  if (err) {
    res.status(400).json({ message: "Bad request 🤔" });
  } else {
    next();
  }
});

//Middleware som skickar Status 500 - Internal server error
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error 🤯" });
});

//127.0.0.1:8000/api/user/signup
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// POST endpoint för att skapa ett nytt konto för användaren
app.post("/api/user/signup", userController.createUser);

//Middleware som skickar Status 404 - Not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found 🤷‍♂️" });
});

// POST endpoint för att logga in användaren
router.post("/api/user/login", async (req, res) => {
  try {
    const user = await UserModel.loginUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// GET endpoint för att hämta alla anteckningar
router.get("/api/notes", async (req, res) => {
  try {
    const notes = await NoteModel.getAllNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST endpoint för att spara en ny anteckning
router.post("/api/notes", async (req, res) => {
  try {
    const newNote = await NoteModel.createNote(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT endpoint för att ändra en befintlig anteckning
router.put("/api/notes/:id", async (req, res) => {
  try {
    const updatedNote = await NoteModel.updateNote(req.params.id, req.body);
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE endpoint för att ta bort en anteckning
router.delete("/api/notes/:id", async (req, res) => {
  try {
    await NoteModel.deleteNote(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint för att söka bland anteckningar
router.get("/api/notes/search", async (req, res) => {
  try {
    // Implementera logiken för att söka bland anteckningar här
    res.status(501).json({ message: "Not implemented" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//Tilldelar värdet av variabeln PORT och BASE_URL från miljövbariablerna i env.
const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

//Startar min Express-server.
app.listen(PORT, () => {
  console.log(`Listening to the server! 😀 and running at ${BASE_URL}:${PORT}`);
});
