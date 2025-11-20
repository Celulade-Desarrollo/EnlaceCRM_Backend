import { EstadoCuentaPort } from "../../domain/ports/EstadoCuentaPort.js";
import { estadoCuentaRepository } from "../repositories/estadoCuenta.repository.js";

export class EstadoCuentaAdapter extends EstadoCuentaPort {
  async obtenerEstadoCuenta(identificadorTendero) {
    return await estadoCuentaRepository.obtenerEstadoCuentaPorCedula(identificadorTendero);
  }

  async registrarMovimiento(movimiento) {
    return await estadoCuentaRepository.registrarMovimiento(movimiento);
  }

  async calcularDeudaTotal(identificadorTendero) {
    return await estadoCuentaRepository.calcularDeudaTotal(identificadorTendero);
  }

  async obtenerCupoDisponible(identificadorTendero) {
    return await estadoCuentaRepository.obtenerCupoDisponible(identificadorTendero);
  }

  async obtenerFechaSiguienteAbono(identificadorTendero) {
    return await estadoCuentaRepository.obtenerFechaSiguienteAbono(identificadorTendero);
  }

  async estaBloqueadoPorMora(identificadorTendero) {
    return await estadoCuentaRepository.estaBloqueadoPorMora(identificadorTendero);
  }

  async obtenerProveedoresHabilitados(identificadorTendero) {
    return await estadoCuentaRepository.obtenerProveedoresHabilitados?.(identificadorTendero) ?? [];
  }

  async registrarPago(pago) {
    return await estadoCuentaRepository.registrarPago(pago);
  }

  async obtenerMovimientosPorClienteUltimosTresMeses(IdUsuarioFinal) {
    return await estadoCuentaRepository.obtenerPorClienteUltimosTresMeses(IdUsuarioFinal);  
  }

  async obtenerTodosLosMovimientos() {
    return await estadoCuentaRepository.obtenerTodosLosMovimientos();
  }

  async actualizarMontoMovimiento(idMovimiento, nuevoMonto, Intereses, InteresesMora, Fees) {
    return await estadoCuentaRepository.actualizarMontoMovimiento(idMovimiento, nuevoMonto, Intereses, InteresesMora, Fees);
  }

  async registrarMovimientoAbono(IdMovimiento, AbonoUsuario){
    return await estadoCuentaRepository.registrarMovimientoAbono(IdMovimiento, AbonoUsuario);
  }

  async traerPorIdMovimiento(IdMovimiento){
    return await estadoCuentaRepository.traerPorIdMovimiento(IdMovimiento);
  }
}
