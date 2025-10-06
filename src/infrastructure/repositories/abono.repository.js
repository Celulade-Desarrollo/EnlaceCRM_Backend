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
      .input("VlrCuota", sql.Decimal(18, 2), abono.VlrCuota)
      .input("VlrCuotalistadomora", sql.Decimal(18, 2), abono.VlrCuotalistadomora)
      .input("fecproxima", sql.Date, abono.fecproxima)
      .input("nrodiasmora", sql.Int, abono.nrodiasmora)
      .input("abonoIntereses", sql.Decimal(18, 2), abono.abonoIntereses)
      .input("AbonoFees", sql.Decimal(18, 2), abono.AbonoFees)
      .input("CobroFees", sql.Decimal(18, 2), abono.CobroFees)
      .query(`
        INSERT INTO Abonos (
          numeroid, persona, cuentacliente, operacion,
          VlrCuota, VlrCuotalistadomora, fecproxima,
          nrodiasmora, abonoIntereses, AbonoFees, CobroFees
        )
        SELECT
          @numeroid, @persona, @cuentacliente, @operacion,
          @VlrCuota, @VlrCuotalistadomora, @fecproxima,
          @nrodiasmora, @abonoIntereses, @AbonoFees, @CobroFees
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