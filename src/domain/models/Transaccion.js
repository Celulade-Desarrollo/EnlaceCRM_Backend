export class Transaccion {
  constructor({ 
    id, cedula, codigoTransaccion, codigoFactura, valor, fecha, hora 
  }) {
    this.id = id;
    this.cedula = cedula;
    this.codigoTransaccion = codigoTransaccion;
    this.codigoFactura = codigoFactura;
    this.valor = Number(valor);
    this.fecha = fecha;
    this.hora = hora;
    this.validar();
  }

  validar() {
    if (!this.cedula) throw new Error('La cédula es requerida');
    if (!this.valor || this.valor <= 0) throw new Error('El valor debe ser mayor a 0');
    if (!this.codigoTransaccion) throw new Error('El código de transacción es requerido');
    if (!this.fecha) throw new Error('La fecha es requerida');
  }

  obtenerFechaCompleta() {
    return `${this.fecha} ${this.hora || '00:00:00'}`;
  }

  toJSON() {
    return {
      id: this.id,
      cedula: this.cedula,
      factura: this.codigoFactura,
      valor: this.valor,
      fecha: this.fecha,
      hora: this.hora
    };
  }
}
