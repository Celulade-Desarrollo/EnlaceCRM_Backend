import { poolPromise } from "../../infrastructure/persistence/database.js";
import sql from "mssql"; // SDK de MYSQL

// Funcion GET que recibe la información de Truora
const truoraInfo = async (req, res) => {
  try {
    const info = req.body;
    console.log(info);
    res.status(200); // Si sale bien
  } catch (err) {
    res.status(500).send(err.message); // Si sale mal
  }
};

export { truoraInfo };
