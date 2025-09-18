export class Abono {
  constructor({ Cedula, Id_transaccion, Monto_total, Tipo_abono, Fecha, Hora }) {
    this.Cedula = Cedula;
    this.Id_transaccion = Id_transaccion;
    this.Monto_total = Monto_total;
    this.Tipo_abono = Tipo_abono;
    this.Fecha = Fecha;
    this.Hora = Hora;
  }

  validarDatos() {
    if (!this.Cedula || !this.Id_transaccion) {
      throw new Error("Cedula e Id_transaccion son obligatorios");
    }
     this.Cedula = String(this.Cedula).trim();
     this.Id_transaccion = String(this.Id_transaccion).trim();
  }
}
