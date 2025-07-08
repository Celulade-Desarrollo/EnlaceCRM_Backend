// src/interfaces/middleware/phone_middleware.js

import { poolPromise } from "../../infrastructure/persistence/database.js"; // Ajuste de ruta
import sql from "mssql";

const buscarUsuarioPorTelefono = async (req, res, next) => {
  const CedulaData = req.params.Cedula; 
  try {
    const pool = await poolPromise;

    // Verificar si es un usuario final
    const usuario = await pool
      .request()
      .input("Cedula_Usuario", sql.NVarChar, CedulaData)
      .query(`SELECT * FROM UsuarioFinal WHERE Cedula_Usuario = @Cedula_Usuario`);

    if (usuario.recordset.length > 0) {
      return res.status(200).json({
        tipo: "usuario",
        usuario: usuario.recordset[0]
      });
    }

    // Verificar si es un administrador
    const admin = await pool
      .request()
      .input("Cedula_Admin", sql.NVarChar, CedulaData)
      .query(`SELECT * FROM Admin WHERE Cedula_Admin = @Cedula_Admin`);

    if (admin.recordset.length > 0) {
      return res.status(200).json({
        tipo: "admin",
        admin: admin.recordset[0]
      });
    }

    // Si no se encuentra
    return res.status(404).json({ message: "Cédula no registrada" });
  } catch (error) {
    res.status(500).json({ message: "Error consultando la cedula", error: error.message });
  }
};

export { buscarUsuarioPorTelefono };
