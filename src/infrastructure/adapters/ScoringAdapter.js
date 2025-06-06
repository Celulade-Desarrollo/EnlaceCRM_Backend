import { scoringRepository } from "../../repositories/scoring.repository.js";
import { ScoringPort } from "../../../domain/ports/ScoringPort.js";

export class ScoringAdapter extends ScoringPort {
  async obtenerTodos() {
    return await scoringRepository.obtenerTodos();
  }

  async obtenerPorId(id) {
    return await scoringRepository.obtenerPorId(id);
  }

  async obtenerPorEstado(estado) {
    return await scoringRepository.obtenerPorEstado(estado);
  }

  async crear(data) {
    return await scoringRepository.crear(data);
  }

  async actualizarEstadoPorId(id, nuevoEstado) {
    return await scoringRepository.actualizarEstadoPorId(id, nuevoEstado);
  }
}
