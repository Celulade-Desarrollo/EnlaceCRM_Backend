export class Abono {
  constructor({
    numeroid,
    persona,
    cuentacliente,
    operacion,
    AbonoTotal,
    abonoIntereses,
    AbonoFees,
    AbonoCapital
  }) {
    this.numeroid = numeroid;
    this.persona = persona;
    this.cuentacliente = cuentacliente;
    this.operacion = operacion;
    this.AbonoTotal = AbonoTotal;
    this.abonoIntereses = abonoIntereses;
    this.AbonoFees = AbonoFees;
    this.AbonoCapital = AbonoCapital;
  }

  validarDatos() {
    if (!this.numeroid || !this.operacion) {
      throw new Error("numeroid y operacion son obligatorios");
    }
    this.numeroid = Number(this.numeroid);
    this.operacion = Number(this.operacion);
  }
}