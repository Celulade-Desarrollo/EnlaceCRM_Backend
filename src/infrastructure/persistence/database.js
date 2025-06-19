import sql from "mssql";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// Cargar variables de entorno
dotenv.config();

// 🎯 Configuración centralizada (infraestructura, no dominio)
const dbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  dialect: "mssql",
  dialectOptions: {
    encrypt: true,
    trustServerCertificate: true,
    options: {
      enableArithAbort: true,
      cryptoCredentialsDetails: {
        minVersion: "TLSv1",
      },
    },
  },
  pool: {
    max: 10,
    min: 0,
    idle: 30000,
  },
  logging: false,
};

// Instancia de Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

/* 
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

  */

export { sql, sequelize };
