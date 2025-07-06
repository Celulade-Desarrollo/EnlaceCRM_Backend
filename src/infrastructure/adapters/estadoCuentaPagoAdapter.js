import { EstadoCuentaPort } from "../../domain/ports/EstadoCuentaPort.js";
import { estadoCuentaRepository } from "../repositories/estadoCuenta.repository.js";


export class EstadoCuentaAdapter extends EstadoCuentaPort {
  async obtenerEstadoCuenta(identificadorTendero) {
    return await estadoCuentaRepository.obtenerEstadoCuenta(identificadorTendero);
  }

  async obtenerCupoDisponible(identificadorTendero) {
    return await estadoCuentaRepository.obtenerCupoDisponible(identificadorTendero);
  }

  async obtenerProveedoresHabilitados(identificadorTendero) {
    return await estadoCuentaRepository.obtenerProveedoresHabilitados(identificadorTendero);
  }

  async registrarPago(pago) {
    return await estadoCuentaRepository.registrarPago(pago);
  }
}


