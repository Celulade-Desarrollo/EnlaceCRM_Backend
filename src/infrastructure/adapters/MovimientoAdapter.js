import { validarMovimientoPagoUseCase } from '../../application/usecases/movimientos/validarMovimientoUseCase.js';
// Importaremos el caso de uso de creación más adelante cuando refactoricemos esa parte.
import { createMovimientoUseCase } from '../../application/usecases/movimientos/createMovimientoUseCase.js';

/**
 * @class MovimientoAdapter
 * @description Adaptador para manejar las operaciones de movimientos, conectando
 * la capa de presentación (controladores) con los casos de uso.
 */
export class MovimientoAdapter {
  /**
   * @param {import('../../application/usecases/movimientos/validarMovimientoUseCase.js').ValidarMovimientoPagoUseCase} validarUseCase
   * @param {import('../../application/usecases/movimientos/createMovimientoUseCase.js').createMovimientoUseCase} crearPagoUseCase
   */
  constructor(validarUseCase, crearPagoUseCase) {
    this.validarMovimientoPagoUseCase = validarUseCase;
    this.createMovimientoUseCase = crearPagoUseCase;
  }

  /**
   * Invoca el caso de uso para validar un movimiento de pago.
   * @param {{cedula: string, nrosFacturaAlpina: string[]}} datosValidacion - Los datos provenientes del request.
   * @returns {Promise<object>} El resultado de la validación.
   */
  async validar(datosValidacion) {
    return await this.validarMovimientoPagoUseCase.execute(datosValidacion);
  }

  /**
   * Invoca el caso de uso para crear un movimiento de pago.
   * @param {object} datosCreacion - Los datos provenientes del request para crear el pago.
   * @returns {Promise<import('../../domain/models/EstadoCuentaMovimiento.js').EstadoCuentaMovimiento>}
   */
  async crearPago(datosCreacion) {
    return await this.createMovimientoUseCase.execute(datosCreacion);
  }
}

export const movimientoAdapter = new MovimientoAdapter(validarMovimientoPagoUseCase, createMovimientoUseCase);