export class Pago {
  constructor({ identificadorTendero, monto, descripcion, fechaPagoProgramado, idMedioPago, nroFacturaAlpina, telefonoTransportista }) {
    if (!identificadorTendero || !monto || isNaN(monto)) {
      throw new Error("identificadorTendero y monto válidos son requeridos");
    }

    this.identificadorTendero = identificadorTendero;
    this.monto = parseFloat(monto);
    this.descripcion = descripcion || "";
    this.fechaPagoProgramado = fechaPagoProgramado || null;
    this.idMedioPago = idMedioPago || null;
    this.nroFacturaAlpina = nroFacturaAlpina || null;
    this.telefonoTransportista = telefonoTransportista || null;
  }
}
