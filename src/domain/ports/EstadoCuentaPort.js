export class EstadoCuentaPort {
  async obtenerEstadoCuenta(identificadorTendero) {
    throw new Error("Method not implemented.");
  }

  async calcularDeudaTotal(identificadorTendero) {
    throw new Error("Method not implemented.");
  }

  async obtenerCupoDisponible(identificadorTendero) {
    throw new Error("Method not implemented.");
  }

  async obtenerFechaSiguienteAbono(identificadorTendero) {
    throw new Error("Method not implemented.");
  }

  async estaBloqueadoPorMora(identificadorTendero) {
    throw new Error("Method not implemented.");
  }

  async obtenerProveedoresHabilitados(identificadorTendero) {
    throw new Error("Method not implemented.");
  }

  async registrarPago(pago) {
    throw new Error("Method not implemented.");
  }

  async registrarMovimiento(movimiento) {
    throw new Error("Method not implemented.");
  }

  async obtenerMovimientosPorClienteUltimosTresMeses(IdUsuarioFinal) {
    throw new Error("Method not implemented.");
  }

  async obtenerTodosLosMovimientos() {
    throw new Error("Method not implemented.");
  }

  async actualizarMontoMovimiento(idMovimiento, nuevoMonto) {
    throw new Error("Method not implemented.");
  }


  async registrarMovimientoAbono(IdMovimiento, AbonoUsuario){
    throw new Error("Method not implemented")
  }

  async traerPorIdMovimiento(IdMovimiento){
    throw new Error("Method not implemented")
  }

  async consultarRecaudoTransportista(numTransportista) {
    throw new Error("Method not implemented")
  }
}

