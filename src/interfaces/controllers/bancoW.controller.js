import { poolPromise } from "../../infrastructure/persistence/database.js";
import sql from "mssql";

// GET: Todos los registros
const getAllBancoW = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM FlujosRegistroBancoW");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET: Por IdFlujoRegistro de enlace
const getByFlujoIdBancoW = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, id)
      .query(
        "SELECT * FROM FlujosRegistroBancoW WHERE IdFlujoRegistro = @IdFlujoRegistro"
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST: Crear nuevo registro
const createBancoW = async (req, res) => {
  const {
    IdFlujoRegistro,
    Validacion_Banco_listas,
    Aprobacion_Cupo_sugerido,
    Pagare_Digital_Firmado,
    Creacion_Core_Bancario,
    UsuarioAprobado,
  } = req.body;

  try {
    const pool = await poolPromise;

    // Verifica si ya hay un registro para ese IdFlujoRegistro
    const check = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, IdFlujoRegistro)
      .query(
        "SELECT IdBancoW FROM FlujosRegistroBancoW WHERE IdFlujoRegistro = @IdFlujoRegistro"
      );

    if (check.recordset.length > 0) {
      return res.status(400).json({
        error: "Ya existe un registro para este flujo.",
      });
    }

    const result = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, IdFlujoRegistro)
      .input("Validacion_Banco_listas", sql.NVarChar, Validacion_Banco_listas)
      .input("Aprobacion_Cupo_sugerido", sql.NVarChar, Aprobacion_Cupo_sugerido)
      .input("Pagare_Digital_Firmado", sql.NVarChar, Pagare_Digital_Firmado)
      .input("Creacion_Core_Bancario", sql.NVarChar, Creacion_Core_Bancario)
      .input("UsuarioAprobado", sql.NVarChar, UsuarioAprobado).query(`
        INSERT INTO FlujosRegistroBancoW (
          IdFlujoRegistro, Validacion_Banco_listas, Aprobacion_Cupo_sugerido,
          Pagare_Digital_Firmado, Creacion_Core_Bancario, UsuarioAprobado
        ) VALUES (
          @IdFlujoRegistro, @Validacion_Banco_listas, @Aprobacion_Cupo_sugerido,
          @Pagare_Digital_Firmado, @Creacion_Core_Bancario, @UsuarioAprobado
        );
        SELECT SCOPE_IDENTITY() AS insertedId;
      `);

    res.status(201).json({
      mensaje: "Registro BancoW creado exitosamente",
      id: result.recordset[0].insertedId,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteBancoWbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, id)
      .query(
        "DELETE FROM FlujosRegistroBancoW WHERE IdFlujoRegistro = @IdFlujoRegistro"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }
    res.status(200);
    res.json({ mensaje: "Registro eliminado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST para crear usuario final en dashboard
const createUserAccount = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, req.body.IdFlujoRegistro)
      .input("Numero_Cliente", sql.NVarChar, req.body.Numero_Cliente)
      .input("CupoFinal", sql.NVarChar, req.body.CupoFinal).query(`
      INSERT INTO UsuarioFinal (IdFlujoRegistro, CupoFinal, Numero_Cliente)
      VALUES (@IdFlujoRegistro, @CupoFinal, @Numero_Cliente);
    `);

    res.status(200).json({
      message: "Cuenta creada exitosamente",
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET Obtener el usuario final por IdFlujoRegistro
const getUserAccountById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, id)
      .query(
        "SELECT * FROM UsuarioFinal WHERE IdFlujoRegistro = @IdFlujoRegistro"
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export {
  getAllBancoW,
  getByFlujoIdBancoW,
  createBancoW,
  deleteBancoWbyId,
  createUserAccount,
  getUserAccountById,
};
