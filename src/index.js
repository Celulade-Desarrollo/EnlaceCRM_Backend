import express from "express";
import cors from "cors";
import { poolPromise } from "./infrastructure/persistence/database.js";

// Rutas desde interfaces (corrige los nombres reales de los archivos)
import flujoRegistroEnlace from "./interfaces/routes/flujoRegistroEnlaceRoute.route.js"; // ✅ nombre correcto
import bancoW from "./interfaces/routes/bancoW.route.js";
import scoring from "./interfaces/routes/scoring.route.js";
import truora from "./interfaces/routes/truora.route.js";
import twilioRouter from "./interfaces/routes/twilio.route.js";

// Swagger
import swaggerDocs from "./config/swagger-config.js";

// Crear App express
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Swagger
swaggerDocs(app);

// Rutas
app.use(flujoRegistroEnlace);
app.use(bancoW);
app.use(scoring);
app.use(truora);
app.use(twilioRouter);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await poolPromise;
    console.log("✅ Conexión a BD exitosa");
  } catch (err) {
    console.error("❌ Error al conectar a la base de datos:", err.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📘 Swagger disponible en http://localhost:${PORT}/api-docs`);
  });
}

startServer();

