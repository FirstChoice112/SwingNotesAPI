//Laddar in dotenv.
require("dotenv").config();
//Importera express modulen och skapar en express-app. Tar in databas-initialiseringen från models mappen
const express = require("express");
const app = express();
const router = express.Router();
const jwtService = require("./services/jwtService");
const notesRoutes = require("./routes/notesRoutes");
const userRoutes = require("./routes/usersRoutes");

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
  } else {
    jwtService(req, res, next);
  }
});
// POST endpoint to create a new user
app.post("/api/user/signup", userRoutes.createUser);
// POST endpoint to log in
app.post("/api/user/login", userRoutes.loginUser);
//Get endpoint to get all notes
app.get("/api/notes/:userId", notesRoutes.getAllNotes);
//Post endpoint to create a new note
app.post("/api/notes/:userId", notesRoutes.createNote);
//Put endpoint to update a note
app.put("/api/notes/:noteId", notesRoutes.updateNote);
//Delete endpoint to delete a note
app.delete("/api/notes/:noteid", notesRoutes.deleteNote);
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//Declare the Swagger docs och ui
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./utils/swaggerOptions");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//Middleware for Status 404 - Not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found 🤷‍♂️" });
});
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
//start the server
app.listen(PORT, () => {
  console.log(`Listening to the server! 😀 and running at ${BASE_URL}:${PORT}`);
});
