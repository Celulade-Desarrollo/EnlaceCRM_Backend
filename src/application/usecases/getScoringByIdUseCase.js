import { scoringRepository } from "../../infrastructure/repositories/scoring.repository.js";

export async function getScoringByIdUseCase(id) {
  return await scoringRepository.obtenerPorId(id);
}
