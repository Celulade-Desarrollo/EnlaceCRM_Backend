import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const scoringRepository = {
  // ✅ Obtener todos los registros de scoring
  async obtenerTodos() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        s.IdFlujoRegistro,
        s.Scoring,
        s.Cupo,
        s.Estado,
        s.Numero_Cliente,
        s.Cedula_Cliente,
        s.Latitud,         -- 👈 agregado
        s.Longitud,        -- 👈 agregado
        fr.Nombres, 
        fr.Primer_Apellido
      FROM FlujosRegistroEnlaceScoring s
      JOIN FlujosRegistroEnlace fr ON s.IdFlujoRegistro = fr.Id
    `);

    console.log("✅ Datos desde BD:", result.recordset); // para verificar que vienen lat/long
    return result.recordset;
  },

  // ✅ Verificar si ya existe 
  async verificarDuplicados(input) {
    const { IdFlujoRegistro } = input;
    const pool = await poolPromise;

    const result = await pool.request()
      .input("IdFlujoRegistro", sql.NVarChar, IdFlujoRegistro)
      .query(`
        SELECT 1 FROM FlujosRegistroEnlaceScoring
        WHERE IdFlujoRegistro = @IdFlujoRegistro
      `);

    return result.recordset.length > 0;
  },

  // ✅ Obtener un registro por ID de flujo
  async obtenerPorId(idFlujoRegistro) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
      .query(`
        SELECT 
          IdFlujoRegistro,
          Scoring,
          Cupo,
          Estado,
          Numero_Cliente,
          Cedula_Cliente,
          Latitud,
          Longitud
        FROM FlujosRegistroEnlaceScoring
        WHERE IdFlujoRegistro = @IdFlujoRegistro
      `);

    return result.recordset[0] || null;
  },

  // ✅ Obtener registros por estado (pendiente, aprobado, etc.)
  async obtenerPorEstado(estado) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Estado", sql.NVarChar, estado)
      .query(`
        SELECT 
          s.IdFlujoRegistro,
          s.Scoring,
          s.Cupo,
          s.Estado,
          s.Numero_Cliente,
          s.Cedula_Cliente,
          s.Latitud,        -- 👈 agregado
          s.Longitud,       -- 👈 agregado
          fr.Nombres, 
          fr.Primer_Apellido,
          fr.Correo_Electronico
        FROM FlujosRegistroEnlaceScoring s
        JOIN FlujosRegistroEnlace fr ON s.IdFlujoRegistro = fr.Id
        WHERE s.Estado = @Estado
      `);

    console.log("✅ Datos por estado:", result.recordset);
    return result.recordset;
  },

  // ✅ Crear un nuevo registro de scoring (con Latitud y Longitud)
  async crear(scoringData) {
    const {
      IdFlujoRegistro,
      Scoring,
      Cupo,
      Numero_Cliente,
      Cedula_Cliente,
      Estado = "pendiente",
      Latitud,
      Longitud,
    } = scoringData;

    const pool = await poolPromise;

    // Validar duplicado
    const existing = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, IdFlujoRegistro)
      .query(`
        SELECT 1 FROM FlujosRegistroEnlaceScoring 
        WHERE IdFlujoRegistro = @IdFlujoRegistro
      `);

    if (existing.recordset.length > 0) {
      throw new Error("Ya existe un registro con este IdFlujoRegistro");
    }

    // Insertar nuevo registro
    await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, IdFlujoRegistro)
      .input("Scoring", sql.NVarChar(50), Scoring || null)
      .input("Cupo", sql.NVarChar(100), Cupo)
      .input("Numero_Cliente", sql.NVarChar(50), Numero_Cliente)
      .input("Cedula_Cliente", sql.NVarChar(50), Cedula_Cliente)
      .input("Estado", sql.NVarChar(50), Estado)
      .input("Latitud", sql.NVarChar(50), Latitud || null)
      .input("Longitud", sql.NVarChar(50), Longitud || null)
      .query(`
        INSERT INTO FlujosRegistroEnlaceScoring 
        (IdFlujoRegistro, Scoring, Cupo, Estado, Numero_Cliente, Cedula_Cliente, Latitud, Longitud)
        VALUES (@IdFlujoRegistro, @Scoring, @Cupo, @Estado, @Numero_Cliente, @Cedula_Cliente, @Latitud, @Longitud)
      `);
  },

  // ✅ Actualizar solo el estado del scoring
  async actualizarEstadoPorId(id, nuevoEstado) {
    const pool = await poolPromise;

    const existing = await pool
      .request()
      .input("IdFlujoRegistro", sql.Int, id)
      .query(`
        SELECT 1 FROM FlujosRegistroEnlaceScoring 
        WHERE IdFlujoRegistro = @IdFlujoRegistro
      `);

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
