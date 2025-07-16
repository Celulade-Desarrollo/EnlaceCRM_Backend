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
        SELECT m1.IdUsuarioFinal AS id, m1.NroFacturaAlpina, m1.BloqueoMora
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
  },

  // metodo para verificar si ya hay pago registrado para la factura
  async existePagoParaFactura(idUsuario, nroFactura) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("idUsuario", sql.Int, idUsuario)
      .input("nroFactura", sql.NVarChar, nroFactura)
      .query(`
        SELECT COUNT(1) AS count
        FROM EstadoCuentaMovimientos
        WHERE IdTipoMovimiento = 2
          AND IdUsuarioFinal = @idUsuario
          AND NroFacturaAlpina = @nroFactura
      `);
    return result.recordset[0].count > 0;
  },

  // metodo para quitar mora cuando se paga
async quitarMoraSiPago(idUsuario, nroFactura) {
  const pool = await poolPromise;
  await pool.request()
    .input("idUsuario", sql.Int, idUsuario)
    .input("nroFactura", sql.NVarChar, nroFactura)
    .query(`
      UPDATE EstadoCuentaMovimientos
      SET BloqueoMora = 0
      WHERE IdUsuarioFinal = @idUsuario
        AND NroFacturaAlpina = @nroFactura
        AND IdTipoMovimiento = 1
    `);
},

async obtenerUFacturasAbonadas() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(`
      SELECT DISTINCT NroFacturaAlpina, IdUsuarioFinal
      FROM EstadoCuentaMovimientos
      WHERE IdTipoMovimiento = 2 -- tipo 2: pago/abonado
    `);
  return result.recordset;
},

async desmarcarFacturasPagadas() {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(`
      UPDATE m1
      SET BloqueoMora = 0
      FROM EstadoCuentaMovimientos m1
      INNER JOIN EstadoCuentaMovimientos m2
        ON m1.NroFacturaAlpina = m2.NroFacturaAlpina
        AND m1.IdUsuarioFinal = m2.IdUsuarioFinal
      WHERE m1.IdTipoMovimiento = 1
        AND m1.BloqueoMora = 1
        AND m2.IdTipoMovimiento = 2;
    `);
  console.log("Filas afectadas por desmarcarFacturasPagadas:", result.rowsAffected);
}


};
