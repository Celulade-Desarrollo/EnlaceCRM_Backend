import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const verifyMoraRepository = {
  async obtenerUsuariosConPagosVencidos() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const pool = await poolPromise;
    const result = await pool.request()
      .input("fecha", sql.Date, hoy)
      .query(`
        SELECT m1.IdUsuarioFinal AS id, m1.NroFacturaAlpina
        FROM EstadoCuentaMovimientos m1
        WHERE m1.IdTipoMovimiento = 1
          AND m1.FechaPagoProgramado <= @fecha
          AND m1.BloqueoMora = 0
          AND NOT EXISTS (
              SELECT 1
              FROM EstadoCuentaMovimientos m2
              WHERE m2.IdTipoMovimiento = 2
                AND m2.NroFacturaAlpina = m1.NroFacturaAlpina
          )
      `);

    return result.recordset;
  },

  async marcarUsuarioEnMora(idUsuario, nroFactura) {
    const pool = await poolPromise;
    await pool.request()
      .input("idUsuario", sql.Int, idUsuario)
      .input("nroFactura", sql.NVarChar, nroFactura)
      .query(`
        UPDATE EstadoCuentaMovimientos
        SET BloqueoMora = 1
        WHERE IdUsuarioFinal = @idUsuario
          AND NroFacturaAlpina = @nroFactura
          AND IdTipoMovimiento = 1
      `);
  }
};
