import { movimientoRepository } from "../../../infrastructure/repositories/movimiento.repository.js";

/**
 * Valida si un movimiento de pago es válido según las reglas de negocio.
 * @param {object} data - Los datos para la validación del movimiento.
 * @param {string} data.cedula - Cédula del tendero.
 * @param {number} data.tipoMovimiento - Tipo de movimiento (debe ser 1 para 'Pago').
 * @param {number} data.monto - El monto que se desea pagar.
 * @param {string} data.nroFactura - El número de la factura que se desea pagar.
 * @returns {Promise<{isValid: boolean, message: string}>} Un objeto indicando si el movimiento es válido y un mensaje.
 * @throws {Error} Lanza un error si la validación falla.
 */
const validarMovimientoPago = async ({ cedula, tipoMovimiento, monto, nroFactura }) => {
  // 1. Solo se procesa el movimiento tipo 1 "Pago"
  if (tipoMovimiento !== 1) {
    throw new Error("Operación no válida para este tipo de movimiento. Se esperaba tipo 1 (Pago).");
  }

  // 2. Validar que los datos necesarios para un pago están presentes
  if (!cedula || !monto || !nroFactura) {
    throw new Error("Faltan datos requeridos para la validación: cédula, monto y número de factura son obligatorios.");
  }

  // 3. Obtener datos del tendero y la factura usando el repositorio
  const tenderoPromise = movimientoRepository.findTenderoByCedula(cedula);
  const facturaPromise = movimientoRepository.findFacturaByNumero(nroFactura);

  const [tendero, factura] = await Promise.all([tenderoPromise, facturaPromise]);

  // 4. Aplicar reglas de negocio
  if (!tendero) {
    throw new Error("El tendero con la cédula proporcionada no fue encontrado.");
  }

  if (tendero.BloqueoPorMora) {
    throw new Error("El tendero se encuentra bloqueado por mora y no puede realizar pagos.");
  }

  if (!factura) {
    throw new Error("La factura con el número proporcionado no fue encontrada.");
  }

  if (monto > factura.MontoTotal) {
    throw new Error(`El monto a pagar (${monto}) no puede ser mayor al monto total de la factura (${factura.MontoTotal}).`);
  }

  // 5. Si todas las validaciones son exitosas
  return {
    isValid: true,
    message: "El movimiento es válido y puede ser procesado.",
  };
};

export const movimientoUseCase = {
  validarMovimientoPago,
};