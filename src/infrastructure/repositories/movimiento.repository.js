import { poolPromise, sql } from "../persistence/database.js";

/**
 * Busca una factura específica por su número.
 * @param {string} nroFactura - El número de la factura a buscar.
 * @returns {Promise<{ MontoTotal: number } | null>} El objeto de la factura con su monto, o null si no se encuentra.
 */
const findFacturaByNumero = async (nroFactura) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input("NroFactura", sql.VarChar, nroFactura);

    // Asumo que la tabla se llama 'Facturas' y las columnas 'NroFactura' y 'MontoTotal'
    const result = await request.query(
      "SELECT MontoTotal FROM Facturas WHERE NroFactura = @NroFactura"
    );

    return result.recordset[0] || null;
  } catch (error) {
    console.error("Error en findFacturaByNumero:", error);
    throw new Error("Error al obtener datos de la factura desde la base de datos.");
  }
};

/**
 * Busca un tendero por su cédula para verificar su estado.
 * @param {string} cedula - La cédula del tendero.
 * @returns {Promise<{ BloqueoPorMora: boolean } | null>} El estado del tendero, o null si no se encuentra.
 */
const findTenderoByCedula = async (cedula) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input("Cedula", sql.VarChar, cedula);

    // Asumo que la tabla se llama 'Tenderos' y las columnas son 'Cedula' y 'BloqueoPorMora'
    const result = await request.query(
      "SELECT BloqueoPorMora FROM Tenderos WHERE Cedula = @Cedula"
    );

    return result.recordset[0] || null;
  } catch (error) {
    console.error("Error en findTenderoByCedula:", error);
    throw new Error("Error al obtener datos del tendero desde la base de datos.");
  }
};

export const movimientoRepository = {
  findFacturaByNumero,
  findTenderoByCedula,
};