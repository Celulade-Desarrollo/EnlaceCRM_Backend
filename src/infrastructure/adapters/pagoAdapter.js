import { PagoPort } from "../../domain/ports/pagoPort.js";
import { pagoRepository } from "../repositories/pago.repository.js";

export class PagoAdapter extends PagoPort {
  async prepararPago(input) {
    return await pagoRepository.prepararPago(input);
  }

  async confirmarPago(input) {
    return await pagoRepository.confirmarPago(input);
  }

  async obtenerEstadoCuenta(identificadorTendero) {
    return await pagoRepository.obtenerEstadoCuenta(identificadorTendero);
  }

  async obtenerCupoDisponible(identificadorTendero) {
    return await pagoRepository.obtenerCupoDisponible(identificadorTendero);
  }

  async obtenerProveedoresHabilitados(identificadorTendero) {
    return await pagoRepository.obtenerProveedoresHabilitados(identificadorTendero);
  }
}
