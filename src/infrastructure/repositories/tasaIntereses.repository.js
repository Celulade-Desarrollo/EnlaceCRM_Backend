import { poolPromise } from "../persistence/database.js";

export const tasaInteresesRepository = {
  async obtenerTodos() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT *
      FROM TasasIntereses
    `);

    return result.recordset;
  }
};
