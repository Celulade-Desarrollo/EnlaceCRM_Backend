// Imports
import express from "express";
import { poolPromise } from "./db/database.js"; // Importar la conexión de la base de datos
import flujoRegistroEnlace from "./routes/flujoRegistroEnlaceRoute.route.js";
import bancoW from "./routes/bancoW.route.js";
import scoring from "./routes/scoring.route.js";
import cors from "cors";

// Swagger
import swaggerDocs from "./swagger-config.js";

// Crear App express
const app = express();

// Midelware para parsear json en toda la aplicación
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Rutas
app.use(flujoRegistroEnlace, bancoW, scoring);

// Documentación Swagger
swaggerDocs(app);

// direccion del servidor
const PORT = 8080;
async function startServer() {
  try {
    const pool = await poolPromise;
    console.log(pool);
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
      console.log(`Documentación Swagger: http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error(
      "Error al conectarse a la base de datos, no se pudo iniciar el servidor:",
      err
    );
  }
}

// Iniciar servidor
startServer();

