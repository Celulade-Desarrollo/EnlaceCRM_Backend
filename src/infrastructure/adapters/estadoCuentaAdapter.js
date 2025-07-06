import { estadoCuentaRepository } from "../repositories/estadoCuenta.repository.js";
import { EstadoCuentaPort } from "../../domain/ports/EstadoCuentaPort.js";

export class EstadoCuentaAdapter extends EstadoCuentaPort {
  async obtenerEstadoCuenta(cedula) {
    return await estadoCuentaRepository.obtenerEstadoCuentaPorCedula(cedula);
  }

  async calcularDeudaTotal(cedula) {
    return await estadoCuentaRepository.calcularDeudaTotal(cedula);
  }

  async obtenerCupoDisponible(cedula) {
    return await estadoCuentaRepository.obtenerCupoDisponible(cedula);
  }

  async obtenerFechaSiguienteAbono(cedula) {
    return await estadoCuentaRepository.obtenerFechaSiguienteAbono(cedula);
  }

  async estaBloqueadoPorMora(cedula) {
    return await estadoCuentaRepository.estaBloqueadoPorMora(cedula);
  }
}

export const estadoCuentaAdapter = new EstadoCuentaAdapter();
