import { scoringRepository } from "../../../infrastructure/repositories/scoring.repository.js";

export async function getAllScoringUseCase() {
  return await scoringRepository.obtenerTodos();
}
