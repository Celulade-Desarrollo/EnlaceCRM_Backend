import { poolPromise, sql } from "../persistence/database.js";
import { UsuarioFinal } from "../../domain/models/UsuarioFinal.js";
import { EstadoCuenta } from "../../domain/models/EstadoCuenta.js";
import { Factura } from "../../domain/models/Factura.js";
 
/**
 * Busca un usuario final por su cédula.
 * @param {string} cedula_Usuario - La cédula del usuario final.
 * @returns {Promise<UsuarioFinal | null>} - Una instancia de UsuarioFinal, o null si no se encuentra.
 */
const findUsuarioFinalByCedula = async (cedula_Usuario) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input("cedula_Usuario", sql.VarChar, cedula_Usuario);
 
   const result = await request.query(
    `SELECT
        uf.IdUsuarioFinal,
        uf.Cedula_Usuario,
        uf.MontoMinimoPago,
        CASE WHEN uf.BloqueoPorMora IS NULL THEN 0 ELSE uf.BloqueoPorMora END AS BloqueoMora
    FROM UsuarioFinal uf
    WHERE uf.Cedula_Usuario = @cedula_Usuario`
  );
    const usuarioData = result.recordset[0];
 
    return usuarioData ? new UsuarioFinal(usuarioData) : null;
  } catch (error) {
    console.error("Error en findUsuarioFinalByCedula:", error);
    throw new Error("Error al obtener datos del usuario final desde la base de datos.");
  }
};
 
/**
 * Suma el monto total de varias facturas, dados sus números.
 * @param {string[]} nrosFacturaAlpina - Un array de números de factura.
 * @returns {Promise<number>} - La suma del monto de las facturas.
 */
const sumarMontoFacturasPorNumeros = async (nrosFacturaAlpina) => {
  try {
    if (!nrosFacturaAlpina || nrosFacturaAlpina.length === 0) {
      throw new Error("Se requiere al menos un número de factura para calcular la suma.");
    }
 
    const pool = await poolPromise;
    const request = pool.request();
 
    // Construir la consulta SQL dinámicamente para múltiples números de factura
    const query = `
      SELECT SUM(MontoFacturaAlpina) AS MontoTotal
      FROM Factura
      WHERE NroFacturaAlpina IN (${nrosFacturaAlpina.map((_, i) => `@NroFactura${i}`).join(', ')})`;
 
    // Añadir los inputs para cada número de factura
    nrosFacturaAlpina.forEach((nro, index) => {
      request.input(`NroFactura${index}`, sql.VarChar, nro);
    });
 
    const result = await request.query(query);
 
    // Devolver el monto total o 0 si no se encontraron facturas
    return result.recordset[0]?.MontoTotal || 0;
  } catch (error) {
    console.error("Error en sumarMontoFacturasPorNumeros:", error);
    throw new Error("Error al calcular la suma de las facturas desde la base de datos.");
  }
};
 
/**
 * Crea un nuevo movimiento y las facturas asociadas dentro de una transacción.
 * @param {EstadoCuenta} movimiento - La instancia del modelo del movimiento a crear.
 * @param {Factura[]} facturas - Un arreglo de instancias del modelo de las facturas a registrar.
 * @returns {Promise<EstadoCuenta>} - El movimiento creado con su ID.
 */
const crearMovimientoYFacturas = async (movimiento, facturas) => {
  const pool = await poolPromise;
  const transaction = new sql.Transaction(pool);
 
  try {
    await transaction.begin();
 
    // 1. Insertar el movimiento principal y obtener su ID
    const movimientoRequest = transaction.request();
    movimientoRequest
      .input("IdUsuarioFinal", sql.Int, movimiento.idUsuarioFinal)
      .input("IdTipoMovimiento", sql.Int, movimiento.idTipoMovimiento)
      .input("IdEstadoMovimiento", sql.Int, movimiento.idEstadoMovimiento)
      .input("Monto", sql.Decimal(18, 2), movimiento.monto)
      .input("Descripcion", sql.VarChar, movimiento.descripcion)
      .input("FechaPagoProgramado", sql.Date, movimiento.fechaPagoProgramado)
      .input("IdMedioPago", sql.Int, movimiento.idMedioPago)
      .input("BloqueoMora", sql.Bit, movimiento.bloqueoMora)
      .input("TelefonoTransportista", sql.VarChar, movimiento.telefonoTransportista);
 
    const resultMovimiento = await movimientoRequest.query(
      `INSERT INTO EstadoCuentas (
        IdUsuarioFinal, IdTipoMovimiento, IdEstadoMovimiento, Monto, Descripcion,
        FechaPagoProgramado, IdMedioPago, BloqueoMora, TelefonoTransportista
      )
      OUTPUT INSERTED.IdMovimiento
      VALUES (
        @IdUsuarioFinal, @IdTipoMovimiento, @IdEstadoMovimiento, @Monto, @Descripcion,
        @FechaPagoProgramado, @IdMedioPago, @BloqueoMora, @TelefonoTransportista
      );`
    );
 
    const nuevoMovimientoId = resultMovimiento.recordset[0].IdMovimiento;
    movimiento.id = nuevoMovimientoId; // Actualizar el modelo con el nuevo ID.
 
    // 2. Insertar cada una de las facturas asociadas
    for (const factura of facturas) {
      const facturaRequest = transaction.request();
      facturaRequest
        .input("IdEstadoCuentas", sql.Int, nuevoMovimientoId)
        .input("NroFacturaAlpina", sql.VarChar(50), factura.nroFacturaAlpina)
        .input("MontoFacturaAlpina", sql.Decimal(18, 2), factura.montoFacturaAlpina)
        .input("MontoCancelado", sql.Decimal(18, 2), factura.montoCancelado);
     
      await facturaRequest.query(
        `INSERT INTO Factura (
          IdEstadoCuentas, NroFacturaAlpina, MontoFacturaAlpina, MontoCancelado
        ) VALUES (
          @IdEstadoCuentas, @NroFacturaAlpina, @MontoFacturaAlpina, @MontoCancelado
        );`
      );
    }
 
    await transaction.commit();
    return movimiento;
 
  } catch (error) {
    await transaction.rollback();
    console.error("Error en la transacción crearMovimientoYFacturas:", error);
    throw new Error("Error al registrar el movimiento y las facturas en la base de datos.");
  }
};
 
export const movimientoRepository = {
  findUsuarioFinalByCedula,
  sumarMontoFacturasPorNumeros,
  crearMovimientoYFacturas,
};