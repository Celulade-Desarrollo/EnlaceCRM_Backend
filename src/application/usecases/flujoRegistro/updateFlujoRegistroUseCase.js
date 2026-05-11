import { flujoRegistroRepository } from "../../../infrastructure/repositories/flujoRegistro.repository.js";

export const updateFlujoRegistroUseCase = async (id, data) => {
  if (!id) {
    throw new Error("El ID es requerido para actualizar el registro.");
  }
  await flujoRegistroRepository.actualizarRegistro(id, data);
  return "Registro actualizado correctamente.";
};
