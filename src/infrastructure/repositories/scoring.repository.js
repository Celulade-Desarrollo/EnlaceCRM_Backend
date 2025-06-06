import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const scoringRepository = {
  // Obtener todos los registros de scoring
  async obtenerTodos() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM FlujosRegistroEnlaceScoring");
    return result.recordset;
  },

  // Obtener un registro por ID de flujo
  async obtenerPorId(idFlujoRegistro) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
      .query("SELECT * FROM FlujosRegistroEnlaceScoring WHERE IdFlujoRegistro = @IdFlujoRegistro");

    return result.recordset[0] || null;
  },

  // Obtener registros por estado (ej: pendiente, aprobado)
  async obtenerPorEstado(estado) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Estado", sql.NVarChar, estado)
      .query("SELECT * FROM FlujosRegistroEnlaceScoring WHERE Estado = @Estado");

    return result.recordset;
  },

  // Crear un nuevo registro de scoring, validando duplicados
  async crear(scoringData) {
    const {
      IdFlujoRegistro,
      Scoring,
      Cupo,
      Numero_Cliente,
      Cedula_Cliente,
      Estado = "pendiente",
    } = scoringData;

    const pool = await poolPromise;

    const existing = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, IdFlujoRegistro)
      .query("SELECT 1 FROM FlujosRegistroEnlaceScoring WHERE IdFlujoRegistro = @IdFlujoRegistro");

    if (existing.recordset.length > 0) {
      throw new Error("Ya existe un registro con este IdFlujoRegistro");
    }

    await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, IdFlujoRegistro)
      .input("Scoring", sql.NVarChar(50), Scoring || null)
      .input("Cupo", sql.NVarChar(100), Cupo)
      .input("Numero_Cliente", sql.NVarChar(50), Numero_Cliente)
      .input("Cedula_Cliente", sql.NVarChar(50), Cedula_Cliente)
      .input("Estado", sql.NVarChar(50), Estado)
      .query(`
        INSERT INTO FlujosRegistroEnlaceScoring 
        (IdFlujoRegistro, Scoring, Cupo, Estado, Numero_Cliente, Cedula_Cliente)
        VALUES (@IdFlujoRegistro, @Scoring, @Cupo, @Estado, @Numero_Cliente, @Cedula_Cliente)
      `);
  },

  // Actualizar el estado del scoring por ID de flujo
  async actualizarEstadoPorId(id, nuevoEstado) {
    const pool = await poolPromise;

    const existing = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, id)
      .query("SELECT 1 FROM FlujosRegistroEnlaceScoring WHERE IdFlujoRegistro = @IdFlujoRegistro");

    if (existing.recordset.length === 0) {
      throw new Error("Registro no encontrado");
    }

    await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, id)
      .input("Estado", sql.NVarChar(50), nuevoEstado)
      .query(`
        UPDATE FlujosRegistroEnlaceScoring
        SET Estado = @Estado
        WHERE IdFlujoRegistro = @IdFlujoRegistro
      `);
  },
};
