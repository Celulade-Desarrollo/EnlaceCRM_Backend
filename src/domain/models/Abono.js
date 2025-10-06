export class Abono {
  constructor({
    numeroid,
    persona,
    cuentacliente,
    operacion,
    VlrCuota,
    VlrCuotalistadomora,
    fecproxima,
    nrodiasmora,
    abonoIntereses,
    AbonoFees,
    CobroFees
  }) {
    this.numeroid = numeroid;
    this.persona = persona;
    this.cuentacliente = cuentacliente;
    this.operacion = operacion;
    this.VlrCuota = VlrCuota;
    this.VlrCuotalistadomora = VlrCuotalistadomora;
    this.fecproxima = fecproxima;
    this.nrodiasmora = nrodiasmora;
    this.abonoIntereses = abonoIntereses;
    this.AbonoFees = AbonoFees;
    this.CobroFees = CobroFees;
  }

  validarDatos() {
    if (!this.numeroid || !this.operacion) {
      throw new Error("numeroid y operacion son obligatorios");
    }
    this.numeroid = Number(this.numeroid);
    this.operacion = Number(this.operacion);
  }
}