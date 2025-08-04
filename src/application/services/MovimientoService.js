import { movimientoRepository } from '../../infrastructure/repositories/movimiento.repository.js';

/**
 * @class MovimientoService
 * @description Servicio para manejar la lógica de negocio relacionada con los movimientos,
 * interactuando con la capa de repositorio.
 */
export class MovimientoService {
  /**
   * @param {object} repository - El repositorio de movimientos.
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Obtiene los datos necesarios para validar un pago desde la base de datos.
   * @param {string} cedula - La cédula del usuario final.
   * @param {string[]} nrosFacturaAlpina - Un arreglo con los números de las facturas a validar.
   * @returns {Promise<{usuario: import('../../domain/models/UsuarioFinal.js').UsuarioFinal, montoTotalFacturas: number}>} - Un objeto que contiene los datos del usuario y el monto total de las facturas seleccionadas.
   * @throws {Error} Si el usuario no se encuentra o si alguna de las facturas no existe.
   */
  async obtenerDatosParaValidacion(cedula, nrosFacturaAlpina) {
    if (!cedula || !nrosFacturaAlpina || nrosFacturaAlpina.length === 0) {
      throw new Error("La cédula y al menos un número de factura son requeridos.");
    }

    // Usaremos Promise.all para obtener los datos en paralelo
    const [usuario, montoTotalFacturas] = await Promise.all([
      this.repository.findUsuarioFinalByCedula(cedula), // Asumimos que este método existe o lo crearemos.
      this.repository.sumarMontoFacturasPorNumeros(nrosFacturaAlpina) // Crearemos este método en el siguiente paso.
    ]);

    return { usuario, montoTotalFacturas };
  }

  /**
   * Pasa los modelos de dominio al repositorio para su creación en la base de datos.
   * @param {import('../../domain/models/EstadoCuentaMovimiento.js').EstadoCuentaMovimiento} movimiento
   * @param {import('../../domain/models/Factura.js').Factura[]} facturas
   * @returns {Promise<import('../../domain/models/EstadoCuentaMovimiento.js').EstadoCuentaMovimiento>}
   */
  async crearMovimiento(movimiento, facturas) {
    // La lógica de la transacción ya está en el repositorio,
    // el servicio aquí actúa como un pasamanos limpio hacia la capa de infraestructura.
    return this.repository.crearMovimientoYFacturas(movimiento, facturas);
  }
}

// Exportamos una instancia del servicio con su dependencia inyectada.
export const movimientoService = new MovimientoService(movimientoRepository);