import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const verifyOperacionRepository = {
  async existeOperacion(operacionId) {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("operacionId", sql.VarChar, operacionId)
      .query(`
        SELECT COUNT(1) AS count
        FROM Abonos
        WHERE Operacion = @operacionId
      `);

    // Si el conteo es mayor que 0 existe
    return result.recordset[0].count > 0;
  }
};