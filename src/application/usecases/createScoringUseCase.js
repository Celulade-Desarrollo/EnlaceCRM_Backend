import { scoringRepository } from "../../infrastructure/repositories/scoring.repository.js";

export async function createScoringUseCase(input) {
  const {
    IdFlujoRegistro,
    Scoring,
    Cupo,
    Numero_Cliente,
    Cedula_Cliente,
    Estado,
  } = input;

  // Validación básica
  if (!IdFlujoRegistro || !Cupo || !Numero_Cliente || !Cedula_Cliente) {
    throw new Error(
      "IdFlujoRegistro, Cupo, Numero_Cliente y Cedula_Cliente son requeridos"
    );
  }

  // Verificar si ya existe un registro con ese ID
  const existe = await scoringRepository.existePorIdFlujo(IdFlujoRegistro);
  if (existe) {
    throw new Error("Ya existe un registro con este IdFlujoRegistro");
  }

  await scoringRepository.crear({
    IdFlujoRegistro,
    Scoring,
    Cupo,
    Numero_Cliente,
    Cedula_Cliente,
    Estado: Estado || "pendiente",
  });

  return { mensaje: "Registro creado correctamente" };
}
