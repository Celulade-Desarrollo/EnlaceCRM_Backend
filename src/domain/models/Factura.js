/**
 * @class Factura
 * @description Representa la entidad de una factura pagada en el dominio de la aplicación.
 * Esta entidad está vinculada a un movimiento de estado de cuenta.
 */
export class Factura {
  /**
   * @param {object} data - Los datos para inicializar la factura.
   * @param {number} [data.IdFactura] - El ID único de la factura (opcional, se genera en la DB).
   * @param {number} data.IdEstadoCuentaMovimientos - El ID del movimiento al que pertenece esta factura.
   * @param {string} data.NroFacturaAlpina - El número de la factura de Alpina.
   * @param {number} data.MontoFacturaAlpina - El monto total original de la factura.
   * @param {number} data.MontoCancelado - El monto que se abonó a esta factura con el movimiento.
   */
  constructor({ IdFactura, IdEstadoCuentaMovimientos, NroFacturaAlpina, MontoFacturaAlpina, MontoCancelado }) {
    this.id = IdFactura;
    this.idMovimiento = IdEstadoCuentaMovimientos;
    this.nroFacturaAlpina = NroFacturaAlpina;
    this.montoFacturaAlpina = parseFloat(MontoFacturaAlpina) || 0;
    this.montoCancelado = parseFloat(MontoCancelado) || 0;
  }
}