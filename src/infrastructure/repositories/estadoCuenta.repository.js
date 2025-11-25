import { poolPromise } from "../persistence/database.js";
import sql from "mssql";
import { MOVEMENT_TYPES } from "../../constants/movement.constants.js";
import { MOVEMENT_STATES } from "../../constants/movement.constants.js";
import { MOVEMENT_TYPE_NAMES } from "../../constants/movement.constants.js";

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
      .input("tipoMovimiento", sql.Int, MOVEMENT_TYPES.PAGO)
      .input("estadoMovimiento", sql.Int, MOVEMENT_STATES.PAGADO)
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
    tipoMovimiento
  }) {
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

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

      await transaction.request()
        .input("idUsuarioFinal", sql.Int, idUsuarioFinal)
        .input("tipoMovimiento", sql.Int, tipoMovimiento)
        .input("estadoMovimiento", sql.Int, MOVEMENT_STATES.PAGADO)
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
            @estadoMovimiento,
            @monto,
            @descripcion,
            @fechaProgramada,
            @idMedioPago,
            @nroFacturaAlpina,
            @telefonoTransportista
          )
        `);

      const nuevoSaldo = tipoMovimiento === MOVEMENT_TYPES.ABONO
        ? CupoDisponible + monto
        : CupoDisponible - monto;

      await transaction.request()
        .input("idUsuarioFinal", sql.Int, idUsuarioFinal)
        .input("nuevoSaldo", sql.Decimal(18, 2), nuevoSaldo)
        .query(`
          UPDATE UsuarioFinal
          SET CupoDisponible = @nuevoSaldo
          WHERE IdUsuarioFinal = @idUsuarioFinal
        `);

      await transaction.commit();
      return { mensaje: "Movimiento registrado y saldo actualizado exitosamente" };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
          WHERE u.Cedula_Usuario = @cedula AND IdTipoMovimiento = ${MOVEMENT_TYPES.PAGO}
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
  },

  async obtenerPorClienteUltimosTresMeses(IdUsuarioFinal) {
      try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input("IdUsuarioFinal", IdUsuarioFinal);
  
        const result = await request.query(`
          SELECT 
            IdMovimiento,
            IdUsuarioFinal,
            FechaHoraMovimiento,
            IdTipoMovimiento,
            IdEstadoMovimiento,
            Monto,
            Descripcion,
            FechaPagoProgramado,
            NroFacturaAlpina,
            TelefonoTransportista
          FROM EstadoCuentaMovimientos
          WHERE IdUsuarioFinal = @IdUsuarioFinal
            AND FechaHoraMovimiento >= DATEADD(MONTH, -3, GETDATE())
          ORDER BY FechaHoraMovimiento DESC
        `);
  
        return result.recordset;
      } catch (error) {
        console.error("❌ Error en obtenerPorClienteUltimosTresMeses:", error.message);
        throw error;
      }
    },
  
    async obtenerTodosLosMovimientos() {
      try {
          const pool = await poolPromise;
          const result = await pool.request().query(`
              SELECT 
                  ECM.IdMovimiento,
                  ECM.IdUsuarioFinal,
                  ECM.FechaHoraMovimiento,
                  ECM.IdTipoMovimiento,
                  ECM.IdEstadoMovimiento,
                  ECM.Monto,
                  ECM.Descripcion,
                  ECM.FechaPagoProgramado,
                  ECM.NroFacturaAlpina,
                  ECM.MontoMasIntereses,
                  ECM.AbonoUsuario,
                  UF.Cedula_Usuario
              FROM 
                  EstadoCuentaMovimientos ECM
              INNER JOIN 
                  UsuarioFinal UF ON ECM.IdUsuarioFinal = UF.IdUsuarioFinal
              WHERE 
                  ECM.IdTipoMovimiento = 1
              ORDER BY 
                  ECM.FechaHoraMovimiento DESC
          `);
  
          return result.recordset;
      } catch (error) {
          console.error("Error en obtenerTodosLosMovimientos:", error.message);
          throw error;
      }
  },

  async registrarMovimientoAbono(IdMovimiento, AbonoUsuario){
  try {
          const pool = await poolPromise;
          const result = await pool.request()
              .input("IdMovimiento", sql.Int, IdMovimiento)
              .input("AbonoUsuario", sql.Int, AbonoUsuario)
              .query(`
                  UPDATE EstadoCuentaMovimientos 
                  SET AbonoUsuario = @AbonoUsuario
                  WHERE IdMovimiento = @IdMovimiento;`);
          return result.recordset;
      } catch (error) {
          console.error("Error en registrarMovimientoAbono:", error.message);
          throw error;
      }
  },

  async actualizarTelefonoTransportista(identificadorTendero, telefonoTransportista) {
  try {
    const pool = await poolPromise;
    
    // Buscar el IdUsuarioFinal por la cédula
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

    // Actualizar el ÚLTIMO movimiento del usuario
    const result = await pool.request()
      .input("idUsuarioFinal", sql.Int, idUsuarioFinal)
      .input("telefonoTransportista", sql.VarChar, telefonoTransportista)
      .query(`
        UPDATE EstadoCuentaMovimientos
        SET TelefonoTransportista = @telefonoTransportista
        WHERE IdUsuarioFinal = @idUsuarioFinal
          AND IdMovimiento = (
            SELECT TOP 1 IdMovimiento
            FROM EstadoCuentaMovimientos
            WHERE IdUsuarioFinal = @idUsuarioFinal
            ORDER BY FechaHoraMovimiento DESC
          )
      `);

    return { 
      mensaje: "Teléfono actualizado exitosamente",
      rowsAffected: result.rowsAffected[0]
    };
  } catch (error) {
    console.error("Error en actualizarTelefonoTransportista:", error.message);
    throw error;
  }
},
  
  async actualizarMontoMovimiento(IdMovimiento, nuevoMonto) {
      try {
          const pool = await poolPromise;
          const result = await pool.request()
              .input("IdMovimiento", sql.Int, IdMovimiento)
              .input("monto", sql.Int, nuevoMonto)
              .query(`
                  UPDATE EstadoCuentaMovimientos 
                  SET MontoMasIntereses = @monto
                  WHERE IdMovimiento = @IdMovimiento;`);
          return result.recordset;
      } catch (error) {
          console.error("Error en actualizarMontoMovimiento:", error.message);
          throw error;
      }
  },

  async traerPorIdMovimiento(IdMovimiento) {
      try {
          const pool = await poolPromise;
          const result = await pool.request()
              .input("IdMovimiento", sql.Int, IdMovimiento)
              .query(`
                  SELECT * FROM EstadoCuentaMovimientos 
                  WHERE IdMovimiento = @IdMovimiento;`);
          return result.recordset[0];
      } catch (error) {
          console.error("Error en traerPorIdMovimiento:", error.message);
          throw error;
      }
  },
  
};
