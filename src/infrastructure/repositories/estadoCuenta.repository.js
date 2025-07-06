import sql from "mssql";
import { poolPromise } from "../persistence/database.js";

export const estadoCuentaRepository = {
  async registrarPago({ identificadorTendero, monto, descripcion, fechaPagoProgramado }) {
    const pool = await poolPromise;

    const userCheck = await pool.request()
      .input("identificador", sql.VarChar, identificadorTendero)
      .query("SELECT IdUsuarioFinal FROM UsuarioFinal WHERE Cedula_Usuario = @identificador");

    if (!userCheck.recordset.length) {
      throw new Error("Usuario no encontrado");
    }

    const idUsuarioFinal = userCheck.recordset[0].IdUsuarioFinal;

    const MOVEMENT_TYPE_PAYMENT = 2;
    const MOVEMENT_STATE_CONFIRMED = 1;

    const query = `
      INSERT INTO EstadoCuentaMovimientos 
        (IdUsuarioFinal, IdTipoMovimiento, IdEstadoMovimiento, Monto, Descripcion, FechaPagoProgramado)
      VALUES 
        (@idUsuarioFinal, ${MOVEMENT_TYPE_PAYMENT}, ${MOVEMENT_STATE_CONFIRMED}, @monto, @descripcion, @fechaProgramada)
    `;

    try {
      await pool.request()
        .input("idUsuarioFinal", sql.Int, idUsuarioFinal)
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
      SELECT m.*
      FROM EstadoCuentaMovimientos m
      INNER JOIN UsuarioFinal u ON u.IdUsuarioFinal = m.IdUsuarioFinal
      WHERE u.Cedula_Usuario = @cedula
      ORDER BY m.FechaHoraMovimiento DESC
    `;

    try {
      const result = await pool.request()
        .input("cedula", sql.VarChar, cedula)
        .query(query);

      return result.recordset;
    } catch (error) {
      console.error('Error al consultar estado de cuenta:', error);
      throw new Error('No se pudo consultar el estado de cuenta');
    }
  },

  async calcularDeudaTotal(cedula) {
    const pool = await poolPromise;
    try {
      const result = await pool.request()
        .input("cedula", sql.VarChar, cedula)
        .query(`
          SELECT ISNULL(SUM(Monto), 0) AS DeudaTotal
          FROM EstadoCuentaMovimientos m
          INNER JOIN UsuarioFinal u ON u.IdUsuarioFinal = m.IdUsuarioFinal
          WHERE u.Cedula_Usuario = @cedula AND IdTipoMovimiento = 1
        `);
      return result.recordset[0].DeudaTotal;
    } catch (error) {
      console.error('Error al calcular deuda total:', error);
      throw new Error('No se pudo calcular la deuda total');
    }
  },

  async obtenerCupoDisponible(cedula) {
    const pool = await poolPromise;
    try {
      const result = await pool.request()
        .input("cedula", sql.VarChar, cedula)
        .query(`
          SELECT TOP 1 CupoDisponible
          FROM UsuarioFinal
          WHERE Cedula_Usuario = @cedula
        `);
      return result.recordset[0]?.CupoDisponible ?? 0;
    } catch (error) {
      console.error('Error al obtener cupo disponible:', error);
      throw new Error('No se pudo obtener el cupo disponible');
    }
  },

  async obtenerFechaSiguienteAbono(cedula) {
    const pool = await poolPromise;
    try {
      const result = await pool.request()
        .input("cedula", sql.VarChar, cedula)
        .query(`
          SELECT TOP 1 m.FechaPagoProgramado
          FROM EstadoCuentaMovimientos m
          INNER JOIN UsuarioFinal u ON u.IdUsuarioFinal = m.IdUsuarioFinal
          WHERE u.Cedula_Usuario = @cedula AND m.FechaPagoProgramado IS NOT NULL
          ORDER BY m.FechaPagoProgramado ASC
        `);
      return result.recordset[0]?.FechaPagoProgramado ?? null;
    } catch (error) {
      console.error('Error al obtener fecha siguiente abono:', error);
      throw new Error('No se pudo obtener la fecha del siguiente abono');
    }
  },

  async estaBloqueadoPorMora(cedula) {
    const pool = await poolPromise;
    try {
      const result = await pool.request()
        .input("cedula", sql.VarChar, cedula)
        .query(`
          SELECT TOP 1 m.BloqueoMora
          FROM EstadoCuentaMovimientos m
          INNER JOIN UsuarioFinal u ON u.IdUsuarioFinal = m.IdUsuarioFinal
          WHERE u.Cedula_Usuario = @cedula
          ORDER BY m.FechaHoraMovimiento DESC
        `);
      return result.recordset[0]?.BloqueoMora ?? false;
    } catch (error) {
      console.error('Error al verificar bloqueo por mora:', error);
      throw new Error('No se pudo verificar el estado de bloqueo por mora');
    }
  }
};
