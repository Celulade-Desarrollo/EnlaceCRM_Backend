import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const bajarAbonosRepository = {
  async obtenerDatosExcel() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Abonos");
    return result.recordset;
  }
};
