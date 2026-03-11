import { tasaInteresesRepository } from "../../../infrastructure/repositories/tasaIntereses.repository.js";

export async function getAllTasaInteresesUseCase() {
  return await tasaInteresesRepository.obtenerTodos();
}
