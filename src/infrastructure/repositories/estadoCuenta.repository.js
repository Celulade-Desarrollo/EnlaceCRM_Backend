import sql from "mssql";
import { poolPromise } from "../persistence/database.js";

export const estadoCuentaRepository = {
  async registrarPago({ identificadorTendero, monto, descripcion, fechaPagoProgramado }) {
    const pool = await poolPromise;

    const MOVEMENT_TYPE_PAYMENT = 2;
    const MOVEMENT_STATE_CONFIRMED = 1;

    const query = `
      INSERT INTO EstadoCuentaMovimientos 
        (IdUsuarioFinal, IdTipoMovimiento, IdEstadoMovimiento, Monto, Descripcion, FechaPagoProgramado)
      VALUES 
        (
          (SELECT IdUsuarioFinal FROM UsuarioFinal WHERE Cedula_Usuario = @identificador),
          ${MOVEMENT_TYPE_PAYMENT}, ${MOVEMENT_STATE_CONFIRMED}, @monto, @descripcion, @fechaProgramada
        )
    `;

    try {
      await pool.request()
        .input("identificador", sql.VarChar, identificadorTendero)
        .input("monto", sql.Decimal(18, 2), monto)
        .input("descripcion", sql.VarChar, descripcion || null)
        .input("fechaProgramada", sql.Date, fechaPagoProgramado || null)
        .query(query);
    } catch (error) {
      console.error('Error al registrar pago:', error);
      throw new Error('No se pudo registrar el pago en la base de datos');
    }

    return { mensaje: "Pago registrado exitosamente" };
  },

  async obtenerEstadoCuentaPorCedula(cedula) {
    const pool = await poolPromise;
    const query = `
      SELECT * FROM EstadoCuentaMovimientos
      WHERE IdUsuarioFinal = (
        SELECT IdUsuarioFinal FROM UsuarioFinal WHERE Cedula_Usuario = @cedula
      )
      ORDER BY FechaHoraMovimiento DESC
    `;

    const result = await pool.request()
      .input("cedula", sql.VarChar, cedula)
      .query(query);

    return result.recordset;
  },

  async calcularDeudaTotal(cedula) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("cedula", sql.VarChar, cedula)
      .query(`
        SELECT ISNULL(SUM(Monto), 0) AS DeudaTotal
        FROM EstadoCuentaMovimientos
        WHERE IdUsuarioFinal = (
          SELECT IdUsuarioFinal FROM UsuarioFinal WHERE Cedula_Usuario = @cedula
        )
        AND IdTipoMovimiento = 1
      `);
    return result.recordset[0].DeudaTotal;
  },

  async obtenerCupoDisponible(cedula) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("cedula", sql.VarChar, cedula)
      .query(`
        SELECT TOP 1 CupoDisponible
        FROM UsuarioFinal
        WHERE Cedula_Usuario = @cedula
      `);
    return result.recordset[0]?.CupoDisponible ?? 0;
  },

  async obtenerFechaSiguienteAbono(cedula) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("cedula", sql.VarChar, cedula)
      .query(`
        SELECT TOP 1 FechaPagoProgramado
        FROM EstadoCuentaMovimientos
        WHERE IdUsuarioFinal = (
          SELECT IdUsuarioFinal FROM UsuarioFinal WHERE Cedula_Usuario = @cedula
        )
        AND FechaPagoProgramado IS NOT NULL
        ORDER BY FechaPagoProgramado ASC
      `);
    return result.recordset[0]?.FechaPagoProgramado ?? null;
  },

  async estaBloqueadoPorMora(cedula) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("cedula", sql.VarChar, cedula)
      .query(`
        SELECT TOP 1 BloqueoMora
        FROM EstadoCuentaMovimientos
        WHERE IdUsuarioFinal = (
          SELECT IdUsuarioFinal FROM UsuarioFinal WHERE Cedula_Usuario = @cedula
        )
        ORDER BY FechaHoraMovimiento DESC
      `);
    return result.recordset[0]?.BloqueoMora ?? false;
  }
};
