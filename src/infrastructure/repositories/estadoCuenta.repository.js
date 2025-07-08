import sql from "mssql";
import { poolPromise } from "../persistence/database.js";

export const estadoCuentaRepository = {

  async registrarPago({
    identificadorTendero,
    monto,
    descripcion,
    fechaPagoProgramado,
    idMedioPago,
    nroFacturaAlpina,
    telefonoTransportista
  }) {
    const pool = await poolPromise;

    // Validar existencia de usuario
    const resultUsuario = await pool.request()
      .input("identificador", sql.VarChar, identificadorTendero)
      .query(`
        SELECT IdUsuarioFinal
        FROM UsuarioFinal
        WHERE Cedula_Usuario = @identificador
      `);

    if (!resultUsuario.recordset.length) {
      throw new Error("Usuario no encontrado con ese identificador.");
    }

    const idUsuarioFinal = resultUsuario.recordset[0].IdUsuarioFinal;

    // const MOVEMENT_TYPE_PAYMENT = 2;
    // const MOVEMENT_STATE_CONFIRMED = 1;

    // const query = `
    //   INSERT INTO EstadoCuentaMovimientos (
    //     IdUsuarioFinal,
    //     IdTipoMovimiento,
    //     IdEstadoMovimiento,
    //     Monto,
    //     Descripcion,
    //     FechaPagoProgramado,
    //     IdMedioPago,
    //     NroFacturaAlpina,
    //     TelefonoTransportista
    //   )
    //   VALUES (
    //     @idUsuarioFinal,
    //     ${MOVEMENT_TYPE_PAYMENT},
    //     ${MOVEMENT_STATE_CONFIRMED},
    //     @monto,
    //     @descripcion,
    //     @fechaProgramada,
    //     @idMedioPago,
    //     @nroFacturaAlpina,
    //     @telefonoTransportista
    //   )
    // `;

    // await pool.request()
    //   .input("idUsuarioFinal", sql.Int, idUsuarioFinal)
    //   .input("monto", sql.Decimal(18, 2), monto)
    //   .input("descripcion", sql.VarChar, descripcion || null)
    //   .input("fechaProgramada", sql.Date, fechaPagoProgramado || null)
    //   .input("idMedioPago", sql.Int, idMedioPago || null)
    //   .input("nroFacturaAlpina", sql.VarChar, nroFacturaAlpina || null)
    //   .input("telefonoTransportista", sql.VarChar, telefonoTransportista || null)
    //   .query(query);

    const MOVEMENT_TYPE_PAYMENT = 2;
    const MOVEMENT_STATE_CONFIRMED = 1;

    const query = `
      INSERT INTO EstadoCuentaMovimientos (
        IdUsuarioFinal,
        IdTipoMovimiento,
        IdEstadoMovimiento,
        Monto,
        Descripcion,
        FechaPagoProgramado,
        IdMedioPago,
        NroFacturaAlpina,
        TelefonoTransportista
      )
      VALUES (
        @idUsuarioFinal,
        @tipoMovimiento,
        @estadoMovimiento,
        @monto,
        @descripcion,
        @fechaProgramada,
        @idMedioPago,
        @nroFacturaAlpina,
        @telefonoTransportista
      )
    `;

    await pool.request()
      .input("idUsuarioFinal", sql.Int, idUsuarioFinal)
      .input("tipoMovimiento", sql.Int, MOVEMENT_TYPE_PAYMENT)
      .input("estadoMovimiento", sql.Int, MOVEMENT_STATE_CONFIRMED)
      .input("monto", sql.Decimal(18, 2), monto)
      .input("descripcion", sql.VarChar, descripcion || null)
      .input("fechaProgramada", sql.Date, fechaPagoProgramado || null)
      .input("idMedioPago", sql.Int, idMedioPago || null)
      .input("nroFacturaAlpina", sql.VarChar, nroFacturaAlpina || null)
      .input("telefonoTransportista", sql.VarChar, telefonoTransportista || null)
      .query(query);
      
    return { mensaje: "Pago registrado exitosamente" };
  },

  async registrarMovimiento({
    identificadorTendero,
    monto,
    descripcion,
    fechaPagoProgramado,
    idMedioPago,
    nroFacturaAlpina,
    telefonoTransportista,
    tipoMovimiento // 1 = débito, 2 = crédito
  }) {
    const pool = await poolPromise;

    const resultUsuario = await pool.request()
      .input("identificador", sql.VarChar, identificadorTendero)
      .query(`
        SELECT IdUsuarioFinal, CupoDisponible
        FROM UsuarioFinal
        WHERE Cedula_Usuario = @identificador
      `);

    if (!resultUsuario.recordset.length) {
      throw new Error("Usuario no encontrado con ese identificador.");
    }

    const { IdUsuarioFinal: idUsuarioFinal, CupoDisponible } = resultUsuario.recordset[0];

    const MOVEMENT_STATE_CONFIRMED = 1;

    // Insertar movimiento
    await pool.request()
      .input("idUsuarioFinal", sql.Int, idUsuarioFinal)
      .input("tipoMovimiento", sql.Int, tipoMovimiento)
      .input("monto", sql.Decimal(18, 2), monto)
      .input("descripcion", sql.VarChar, descripcion || null)
      .input("fechaProgramada", sql.Date, fechaPagoProgramado || null)
      .input("idMedioPago", sql.Int, idMedioPago || null)
      .input("nroFacturaAlpina", sql.VarChar, nroFacturaAlpina || null)
      .input("telefonoTransportista", sql.VarChar, telefonoTransportista || null)
      .query(`
        INSERT INTO EstadoCuentaMovimientos (
          IdUsuarioFinal,
          IdTipoMovimiento,
          IdEstadoMovimiento,
          Monto,
          Descripcion,
          FechaPagoProgramado,
          IdMedioPago,
          NroFacturaAlpina,
          TelefonoTransportista
        )
        VALUES (
          @idUsuarioFinal,
          @tipoMovimiento,
          ${MOVEMENT_STATE_CONFIRMED},
          @monto,
          @descripcion,
          @fechaProgramada,
          @idMedioPago,
          @nroFacturaAlpina,
          @telefonoTransportista
        )
      `);

    // Calcular nuevo saldo
    const nuevoSaldo = tipoMovimiento === 2
      ? CupoDisponible + monto
      : CupoDisponible - monto;

    // Actualizar el saldo
    await pool.request()
      .input("idUsuarioFinal", sql.Int, idUsuarioFinal)
      .input("nuevoSaldo", sql.Decimal(18, 2), nuevoSaldo)
      .query(`
        UPDATE UsuarioFinal
        SET CupoDisponible = @nuevoSaldo
        WHERE IdUsuarioFinal = @idUsuarioFinal
      `);

    return { mensaje: "Movimiento registrado y saldo actualizado exitosamente" };
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
