import sql from "mssql";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// 🎯 Configuración centralizada (infraestructura, no dominio)
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
    cryptoCredentialsDetails: {
      minVersion: "TLSv1",
    },
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// 📦 Adaptador de infraestructura que provee la conexión
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("✅ Conectado a SQL Server");
    console.log(process.env.DB_USER, process.env.DB_NAME, process.env.DB_PORT, process.env.DB_SERVER, process.env.DB_PASS)
    return pool;
  })
  .catch((err) => {
    console.error("❌ Error en la conexión a la base de datos:", err.message);
    throw err;
  });

export { sql, poolPromise };
