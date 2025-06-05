import { scoringRepository } from "../../infrastructure/repositories/scoring.repository.js";

export async function updateScoringByIdUseCase(id, estado = "pendiente") {
  const existe = await scoringRepository.existePorIdFlujo(id);
  if (!existe) {
    throw new Error("Registro no encontrado");
  }

  await scoringRepository.actualizarEstado(id, estado);
  return { mensaje: "Registro actualizado correctamente" };
}
