export class Pago {
  constructor({ identificadorTendero, monto, descripcion, fechaPagoProgramado, idMedioPago, nroFacturaAlpina, telefonoTransportista }) {
    if (!identificadorTendero || typeof identificadorTendero !== 'string' || identificadorTendero.trim() === '') {
      throw new Error("identificadorTendero debe ser una cadena válida no vacía");
    }

    const numericMonto = parseFloat(monto);
    if (!monto || isNaN(numericMonto) || numericMonto <= 0) {
      throw new Error("monto debe ser un número positivo válido");
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
