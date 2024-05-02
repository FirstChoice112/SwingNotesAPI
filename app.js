//Laddar in dotenv.
require("dotenv").config();
//Importera express modulen och skapar en express-app. Tar in databas-initialiseringen från models mappen
const express = require("express");
const app = express();
const router = express.Router();
const jwtService = require("./services/jwtService");
const userController = require("./controllers/users");
const notesRoutes = require("./routes/notesRoutes");

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
// Middleware för alla endpoints som behöver jwt verifiering
app.use("/api", (req, res, next) => {
  if (req.path === "/user/signup" && req.method === "POST") {
    // Undanta endast /api/user/signup POST från JWT-verifiering
    next();
  } else if (req.path === "/user/login" && req.method === "POST") {
    // Undanta /api/user/login POST från JWT-verifiering
    next();
  } else if (req.path === "/notes" && req.method === "GET") {
    // Undanta /api/notes GET från JWT-verifiering
    next();
  } else {
    jwtService(req, res, next);
  }
});
// POST endpoint för att skapa ett nytt konto för användaren
app.post("/api/user/signup", userController.createUser);
// POST endpoint för att logga in användaren
app.post("/api/user/login", userController.loginUser);
//Get endpoint to get all notes
app.get("/api/notes/:userId", notesRoutes.getAllNotes);
//Post endpoint to create a new note
app.post("/api/notes/:userId", notesRoutes.createNote);
//Put endpoint to update a note
app.put("/api/notes/:id", notesRoutes.updateNote);
//Delete endpoint to delete a note
app.delete("/api/notes/:id", notesRoutes.deleteNote);

//Middleware som skickar Status 404 - Not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found 🤷‍♂️" });
});
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

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
