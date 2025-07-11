import { flujoRegistroService } from "../../services/flujoRegistroServiceInstance.js";

export async function getAllFlujoRegistro() {
  return await flujoRegistroService.obtenerTodos();
}
