require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Ditt API Namn",
      version: "1.0.0",
      description: "Beskrivning av ditt API",
    },
    servers: [
      {
        url: BASE_URL,
        description: "Lokal server",
      },
    ],
  },
  apis: [
    "./utils/swagger-doc.js",
    "./routes/notesRoutes.js",
    "./routes/userRoutes.js",
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
