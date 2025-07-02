export class PagoPort {
  async prepararPago(input) {
    throw new Error("Method prepararPago not implemented.");
  }

  async confirmarPago(input) {
    throw new Error("Method confirmarPago not implemented.");
  }

  async obtenerEstadoCuenta(identificadorTendero) {
    throw new Error("Method obtenerEstadoCuenta not implemented.");
  }

  async obtenerCupoDisponible(identificadorTendero) {
    throw new Error("Method obtenerCupoDisponible not implemented.");
  }

  async obtenerProveedoresHabilitados(identificadorTendero) {
    throw new Error("Method obtenerProveedoresHabilitados not implemented.");
  }
}
