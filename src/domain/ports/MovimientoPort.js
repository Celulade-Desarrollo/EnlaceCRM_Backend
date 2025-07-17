/**
 * @class MovimientoPort
 * @description Define el contrato (la interfaz) para las operaciones del dominio de movimientos.
 * Las capas externas (infraestructura) deben implementar este puerto para que la lógica de negocio pueda usarlas.
 */
export class MovimientoPort {
  /**
   * Obtiene los datos necesarios de la base de datos para validar un pago.
   * @param {string} cedula La cédula del usuario final.
   * @param {string[]} nrosFacturaAlpina Un arreglo con los números de las facturas.
   * @returns {Promise<{usuario: import('../models/UsuarioFinal.js').UsuarioFinal, montoTotalFacturas: number}>}
   */
  async obtenerDatosParaValidacion(cedula, nrosFacturaAlpina) {
    throw new Error("Method 'obtenerDatosParaValidacion' not implemented.");
  }

  // Agregaremos más métodos aquí a medida que refactoricemos la creación de movimientos.
  /**
   * Crea un nuevo movimiento de pago y asocia las facturas pagadas en una transacción.
   * @param {import('../models/EstadoCuentaMovimiento.js').EstadoCuentaMovimiento} movimiento - La instancia del modelo del movimiento a crear.
   * @param {import('../models/Factura.js').Factura[]} facturas - Un arreglo de instancias del modelo de las facturas a registrar.
   * @returns {Promise<import('../models/EstadoCuentaMovimiento.js').EstadoCuentaMovimiento>} - El movimiento creado con su ID asignado.
   */
  async crearMovimientoYFacturas(movimiento, facturas) {
    throw new Error("Method 'crearMovimientoYFacturas' not implemented.");
  }
}