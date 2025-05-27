import sql from "mssql";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// Configuración de la base de datos
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: true, // Usar cifrado
    trustServerCertificate: true, // Confiar en certificados autofirmados
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

// Crear conexión
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Conectado a SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Error en la conexión a la base de datos:", err);
  });
export { poolPromise };
