import { scoringRepository } from "../../../infrastructure/repositories/scoring.repository.js";

export async function getScoringByEstadoUseCase() {
  const estados = ["pendiente", "aprobado"];
  const resultados = await Promise.all(
    estados.map(estado => scoringRepository.obtenerPorEstado(estado))
  );
  return resultados.flat();
}
