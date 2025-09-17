import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const abonoRepository = {
  async insertarAbono(abono) {
    const pool = await poolPromise;
    await pool.request()
        .input("Cedula", sql.NVarChar, abono.Cedula)
        .input("Id_transaccion", sql.NVarChar, abono.Id_transaccion)
        .input("Monto_total", sql.Decimal(18,2), abono.Monto_total)
        .input("Tipo_abono", sql.NVarChar, abono.Tipo_abono)
        .input("Fecha", sql.NVarChar, abono.Fecha)
        .input("Hora", sql.NVarChar, abono.Hora)
        .query(`
            INSERT INTO Abonos (Cedula, Id_transaccion, Monto_total, Tipo_abono, Fecha, Hora)
            SELECT @Cedula, @Id_transaccion, @Monto_total, @Tipo_abono, @Fecha, @Hora
            WHERE NOT EXISTS (
            SELECT 1 FROM Abonos WHERE Id_transaccion = @Id_transaccion
            )
    `);
  }
};
