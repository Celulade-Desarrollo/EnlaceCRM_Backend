import { DispersionPort } from "../../domain/ports/DispersionPort.js";
import { dispersionRepository } from "../repositories/dispersion.repositoy.js";

export class DispersionAdapter extends DispersionPort {
  async obtenerDispersiones() {
    return await dispersionRepository.obtenerDispersiones();
  }
  
  async actualizarEstadoPorId(id, estado) {
    return await dispersionRepository.actualizarEstadoPorId(id, estado);
  }
}