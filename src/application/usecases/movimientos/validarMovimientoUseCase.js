import { movimientoService } from '../../services/MovimientoService.js';

/**
 * @class ValidarMovimientoPagoUseCase
 * @description Caso de uso para validar la información de un pago antes de procesarlo.
 */
export class ValidarMovimientoPagoUseCase {
  /**
   * @param {import('../../services/MovimientoService.js').MovimientoService} service
   */
  constructor(service) {
    this.movimientoService = service;
  }

  /**
   * Ejecuta la lógica de validación del movimiento de pago.
   * @param {object} input - Los datos de entrada para la validación.
   * @param {string} input.cedula - La cédula del usuario final.
   * @param {string[]} input.nrosFacturaAlpina - Arreglo de números de factura a pagar.
   * @returns {Promise<{esValido: boolean, mensaje: string, montoRecomendado: number, montoMinimo: number}>}
   */
  async execute({ cedula, nrosFacturaAlpina }) {
    const { usuario, montoTotalFacturas } = await this.movimientoService.obtenerDatosParaValidacion(cedula, nrosFacturaAlpina);

    if (!usuario) {
      return {
        esValido: false,
        mensaje: `Usuario con cédula ${cedula} no encontrado.`,
        montoRecomendado: 0,
        montoMinimo: 0,
      };
    }

    if (usuario.estaBloqueadoPorMora) {
      return {
        esValido: false,
        mensaje: 'El usuario se encuentra bloqueado por mora y no puede realizar pagos.',
        montoRecomendado: 0,
        montoMinimo: 0,
      };
    }

    return {
      esValido: true,
      mensaje: 'Validación exitosa. El pago puede proceder.',
      montoRecomendado: parseFloat(montoTotalFacturas) || 0,
      montoMinimo: usuario.montoMinimoPago,
    };
  }
}

export const validarMovimientoPagoUseCase = new ValidarMovimientoPagoUseCase(movimientoService);