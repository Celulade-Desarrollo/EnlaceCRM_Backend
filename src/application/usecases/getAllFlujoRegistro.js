import { flujoRegistroRepository } from "../../infrastructure/repositories/flujoRegistro.repository.js";

export async function getAllFlujoRegistro() {
  return await flujoRegistroRepository.obtenerTodos();
}
