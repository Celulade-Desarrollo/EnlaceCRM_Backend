import { EstadoCuentaPort } from "../../domain/ports/estadoCuentaPort.js";
import { estadoCuentaPagoRepository } from "../repositories/estadoCuentaPago.repository.js";

export class EstadoCuentaPagoAdapter extends EstadoCuentaPort {
  async obtenerEstadoCuenta(identificadorTendero) {
    return await estadoCuentaPagoRepository.obtenerEstadoCuenta(identificadorTendero);
  }

  async obtenerCupoDisponible(identificadorTendero) {
    return await estadoCuentaPagoRepository.obtenerCupoDisponible(identificadorTendero);
  }

  async obtenerProveedoresHabilitados(identificadorTendero) {
    return await estadoCuentaPagoRepository.obtenerProveedoresHabilitados(identificadorTendero);
  }

  async registrarPago(pago) {
    return await estadoCuentaPagoRepository.registrarPago(pago);
  }
}


