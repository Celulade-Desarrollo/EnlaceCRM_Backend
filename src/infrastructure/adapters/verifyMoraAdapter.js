import { VerifyMoraPort } from "../../domain/ports/VerifyMoraPort.js";
import { verifyMoraRepository } from "../repositories/verifyMora.repository.js";

export class VerifyMoraAdapter extends VerifyMoraPort {
  async obtenerUsuariosConPagosVencidos() {
    return await verifyMoraRepository.obtenerUsuariosConPagosVencidos();
  }

  async marcarUsuarioEnMora(idUsuario, nroFactura) {
    return await verifyMoraRepository.marcarUsuarioEnMora(idUsuario, nroFactura);
  }
}
