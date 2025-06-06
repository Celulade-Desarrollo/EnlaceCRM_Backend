import { scoringRepository } from "../../infrastructure/repositories/scoring.repository.js";

export async function getScoringByEstadoUseCase(estado = "pendiente") {
  return await scoringRepository.obtenerPorEstado(estado);
}
