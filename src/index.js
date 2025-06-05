import express from "express";
import cors from "cors";
import { poolPromise } from "./infrastructure/persistence/database.js"; // nueva ruta

// Rutas desde interfaces
import flujoRegistroEnlace from "./interfaces/routes/flujoRegistroEnlace.route.js";
import bancoW from "./interfaces/routes/bancoW.route.js";
import scoring from "./interfaces/routes/scoring.route.js";
import truora from "./interfaces/routes/truora.route.js"; // si ya lo tienes

// Swagger
import swaggerDocs from "./config/swagger-config.js"; // nueva ubicación

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

// Documentación Swagger
swaggerDocs(app);

// Rutas
app.use(flujoRegistroEnlace);
app.use(bancoW);
app.use(scoring);
app.use(truora); // opcional, si ya está creado

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Inicialización del servidor con conexión BD
async function startServer() {
  try {
    const pool = await poolPromise;
    console.log("✅ Conexión a BD exitosa:", pool);
  } catch (err) {
    console.error("❌ Error al conectar a la base de datos:", err.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📘 Swagger disponible en http://localhost:${PORT}/api-docs`);
  });
}

startServer();
