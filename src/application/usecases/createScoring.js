import { scoringRepository } from "../../infrastructure/repositories/scoring.repository.js";

export async function createScoringUseCase(data) {
  const existe = await scoringRepository.verificarExistenciaPorIdFlujo(data.IdFlujoRegistro);
  if (existe) {
    throw new Error("Ya existe un registro con este IdFlujoRegistro");
  }

  await scoringRepository.insertarScoring(data);

  return { mensaje: "Registro creado correctamente" };
}
