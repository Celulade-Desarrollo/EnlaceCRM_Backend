export class Movimiento {
  constructor({ id, clienteId, fecha, descripcion, tipo, monto, medioPago, fabricante }) {
    this.id = id;
    this.clienteId = clienteId;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.tipo = tipo; // "pago" o "abono"
    this.monto = monto;
    this.medioPago = medioPago || null;
    this.fabricante = fabricante || null;
  }
}
