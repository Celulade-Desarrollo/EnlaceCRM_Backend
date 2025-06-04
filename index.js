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
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const pool = await poolPromise;
    console.log("Conexión a BD exitosa:", pool);
  } catch (err) {
    console.error("❌ Error al conectar a la base de datos:", err.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📘 Swagger disponible en http://localhost:${PORT}/api-docs`);
  });
}


// Iniciar servidor
startServer();