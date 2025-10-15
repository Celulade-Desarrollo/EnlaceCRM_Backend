import "dotenv/config";
import express from "express";
import cors from "cors";
import { poolPromise } from "./infrastructure/persistence/database.js";

// Rutas desde interfaces
import flujoRegistroEnlace from "./interfaces/routes/flujoRegistroEnlaceRoute.route.js";
import bancoW from "./interfaces/routes/bancoW.route.js";
import scoring from "./interfaces/routes/scoring.route.js";
import truora from "./interfaces/routes/truora.route.js";
import twilioRouter from "./interfaces/routes/twilio.route.js";
import ubicacionRoutes from "./interfaces/routes/ubicacion.routes.js";
import alpinaRouter from "./interfaces/routes/alpina.route.js";
import estadoCuentaRouter from "./interfaces/routes/estadoCuenta.route.js";
import movimientoGetRouter from "./interfaces/routes/movimientoGet.routes.js";
import transaccionesRoutes from "./interfaces/routes/transacciones.routes.js"; 
import abonoRouter from "./interfaces/routes/abonos.route.js";
// import pagosRouter from "./interfaces/routes/confirmarPago.route.js"; 
import { LogsRouter } from "./interfaces/routes/logs.route.js";
import UserAccountRoute from "./interfaces/routes/userAccount.route.js";
import authRouter from "./interfaces/routes/auth.Routes.js";
import adminRouter from "./interfaces/routes/adminAccount.route.js";
import movimientoCuentaRouter from "./interfaces/routes/movimientoCuenta.route.js";
import validarMoraRouter from "./interfaces/routes/validarMora.route.js";

import "./infrastructure/jobs/validarMora.job.js";

// Importar la nueva ruta de movimientos
import movimientoRouter from "./interfaces/routes/movimiento.route.js";

// Swagger
import swaggerDocs from "./config/swagger-config.js";

// Crear App express
const app = express();

// Configuración de CORS
app.use(cors({
  origin: ["*"], // Permite frontend dev y swagger
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept"
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
swaggerDocs(app);

// ✅ Registrar rutas
app.use("/api/transacciones", transaccionesRoutes); // 👈 aquí queda bien montada

app.use(flujoRegistroEnlace);
app.use(bancoW);
app.use(scoring);
app.use(truora);
app.use(twilioRouter);
app.use(ubicacionRoutes);
app.use(UserAccountRoute);
app.use(authRouter);
app.use(alpinaRouter);
app.use(estadoCuentaRouter);
app.use(adminRouter);
app.use(movimientoCuentaRouter);
app.use(validarMoraRouter);
app.use("/api/movimiento", movimientoRouter); // Registrar la nueva ruta en la aplicación
// app.use(movimientoGetRouter);
app.use(LogsRouter)
app.use(abonoRouter);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Puerto del servidor
const PORT = process.env.PORT;

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
    console.log(`Endpoint para login de Administrador (generar tu token): POST http://localhost:${PORT}/auth/admin/login`);
    console.log(`Endpoint para login de Usuario Externo (generar tu token interno): POST http://localhost:${PORT}/auth/user/login-external`);
  });
}

startServer();
