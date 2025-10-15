export class Abono {
    constructor({
    NumeroID,
    Persona,
    CuentaCliente,
    Operacion,
    TOTAL_PAGADO,
    INTERESES,
    SEGUROS,
    CAPITAL,
    IdEstadoProducto,
    FecTransaccion,
    INTERES_MORA,
    DIAS_MORA
  }) {
    this.NumeroID = NumeroID;
    this.Persona = Persona;
    this.CuentaCliente = CuentaCliente;
    this.Operacion = Operacion;
    this.TOTAL_PAGADO = TOTAL_PAGADO;
    this.INTERESES = INTERESES;
    this.SEGUROS = SEGUROS;
    this.CAPITAL = CAPITAL;
    this.IdEstadoProducto = IdEstadoProducto;
    this.FecTransaccion = FecTransaccion;
    this.INTERES_MORA = INTERES_MORA;
    this.DIAS_MORA = DIAS_MORA;
  }
  validarDatos() {
    const camposObligatorios = [
      "NumeroID",
      "Operacion",
      "CuentaCliente",
      "Persona",
      "IdEstadoProducto",
      "FecTransaccion",
      "CAPITAL",
      "TOTAL_PAGADO"
    ];

    for (const campo of camposObligatorios) {
      const valor = this[campo];
      if (valor === undefined || valor === null || valor === "") {
        throw new Error(`El campo '${campo}' es obligatorio.`);
      }
    }
  }
}