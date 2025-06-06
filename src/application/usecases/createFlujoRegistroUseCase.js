import { flujoRegistroRepository } from "../../infrastructure/repositories/flujoRegistro.repository.js";

export async function createFlujoRegistro(input) {
  const duplicado = await flujoRegistroRepository.verificarDuplicados(input);

  if (duplicado) {
    throw new Error("Ya existe un registro con los mismos datos (cédula, celular o correo).");
  }

  await flujoRegistroRepository.insertarRegistro(input);

  return {
    mensaje: "Registro creado exitosamente",
  };
}
