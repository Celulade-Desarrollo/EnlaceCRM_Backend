export class Movimiento {
  constructor({ identificadorTendero, monto, tipoMovimiento, descripcion, fechaPagoProgramado, idMedioPago, nroFacturaAlpina, telefonoTransportista }) {
    if (!identificadorTendero || typeof identificadorTendero !== 'string' || identificadorTendero.trim() === '') {
      throw new Error("identificadorTendero debe ser una cadena válida no vacía");
    }

    const numericMonto = parseFloat(monto);
    if (!monto || isNaN(numericMonto) || numericMonto <= 0) {
      throw new Error("monto debe ser un número positivo válido");
    }

    if (!tipoMovimiento || ![1, 2, 3, 4, 5].includes(tipoMovimiento)) {
      throw new Error("tipoMovimiento debe ser un valor válido entre 1 y 5");
    }

    this.identificadorTendero = identificadorTendero;
    this.monto = numericMonto;
    this.tipoMovimiento = tipoMovimiento;
    this.descripcion = descripcion || "";
    this.fechaPagoProgramado = fechaPagoProgramado || null;
    this.idMedioPago = idMedioPago || null;
    this.nroFacturaAlpina = nroFacturaAlpina || null;
    this.telefonoTransportista = telefonoTransportista || null;
  }
}

