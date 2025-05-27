import { poolPromise } from "../db/database.js";
import sql from "mssql";

// Obtener todos los registros
const getAllScoring = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM FlujosRegistroEnlaceScoring");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Obtener un registro por idFlujoRegistro
const getScoringById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("idFlujoRegistro", sql.Int, id)
      .query(
        "SELECT * FROM FlujosRegistroEnlaceScoring WHERE IdFlujoRegistro = @IdFlujoRegistro"
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Crear un nuevo registro de scoring
const createScoring = async (req, res) => {
  const { IdFlujoRegistro, Scoring, Cupo } = req.body;

  if (!IdFlujoRegistro || !Cupo) {
    return res
      .status(400)
      .json({ message: "IdFlujoRegistro y Cupo son requeridos" });
  }

  try {
    const pool = await poolPromise;

    // Validar si ya existe un registro con ese IdFlujoRegistro
    const existing = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, IdFlujoRegistro)
      .query(
        "SELECT * FROM FlujosRegistroEnlaceScoring WHERE IdFlujoRegistro = @IdFlujoRegistro"
      );

    if (existing.recordset.length > 0) {
      return res
        .status(409)
        .json({ message: "Ya existe un registro con este IdFlujoRegistro" });
    }

    // Insertar nuevo registro
    await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, IdFlujoRegistro)
      .input("Scoring", sql.NVarChar(50), Scoring || null)
      .input("Cupo", sql.NVarChar(100), Cupo).query(`
        INSERT INTO FlujosRegistroEnlaceScoring (IdFlujoRegistro, Scoring, Cupo)
        VALUES (@IdFlujoRegistro, @Scoring, @Cupo)
      `);

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { getAllScoring, getScoringById, createScoring };
