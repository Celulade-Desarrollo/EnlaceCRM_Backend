import { poolPromise } from "../db/database.js"; // Importar la conexión de la base de datos
import sql from "mssql"; // SDK de MYSQL

const buscarUsuarioPorTelefono = async (req, res, next) => {
  const { phone } = req.body;

  try {
    const pool = await poolPromise;
    const usuario = await pool
      .request()
      .input("phone", sql.NVarChar, phone)
      .query(`SELECT * FROM UsuarioFinal WHERE Numero_Cliente = @phone`);

    if (usuario.recordset.length > 0) {
      req.usuario = usuario.recordset[0];
      req.tipo = "usuario";
      return next();
    }

    const admin = await pool
      .request()
      .input("phone", sql.NVarChar, phone)
      .query(`SELECT * FROM Admin WHERE Numero_Admin = @phone`);

    if (admin.recordset.length > 0) {
      req.usuario = admin.recordset[0];
      req.tipo = "admin";
      req.Empresa_Admin = admin.recordset[0].Empresa_Admin;
      return next();
    }

    return res.status(404).json({ message: "Número no registrado" });
  } catch (error) {
    res.status(500).json({ message: "Error consultando el número", error });
  }
};

export { buscarUsuarioPorTelefono };
