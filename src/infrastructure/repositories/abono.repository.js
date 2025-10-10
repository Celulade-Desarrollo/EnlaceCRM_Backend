import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const abonoRepository = {
  async insertarAbono(abono) {
    const pool = await poolPromise;
    await pool.request()
      .input("numeroid", sql.Int, abono.numeroid)
      .input("persona", sql.NVarChar, abono.persona)
      .input("cuentacliente", sql.Int, abono.cuentacliente)
      .input("operacion", sql.Int, abono.operacion)
      .input("AbonoTotal", sql.Decimal(18, 2), abono.AbonoTotal)
      .input("abonoIntereses", sql.Decimal(18, 2), abono.abonoIntereses)
      .input("AbonoFees", sql.Decimal(18, 2), abono.AbonoFees)
      .input("AbonoCapital", sql.Decimal(18, 2), abono.AbonoCapital)
      .query(`
        INSERT INTO Abonos (
          numeroid, persona, cuentacliente, operacion,
          AbonoTotal, abonoIntereses, AbonoFees, AbonoCapital
        )
        SELECT
          @numeroid, @persona, @cuentacliente, @operacion,
          @AbonoTotal, @abonoIntereses, @AbonoFees, @AbonoCapital
        WHERE NOT EXISTS (
          SELECT 1 FROM Abonos WHERE operacion = @operacion
        );
      `);
  },

  async obtenerDatosExcel() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Abonos");
    return result.recordset;
  }
};