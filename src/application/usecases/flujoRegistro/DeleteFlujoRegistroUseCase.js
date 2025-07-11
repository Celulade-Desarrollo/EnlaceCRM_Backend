import { flujoRegistroService } from "../../services/flujoRegistroServiceInstance.js";

export async function deleteFlujoRegistroUseCase(id) {
  return await flujoRegistroService.eliminarPorId(id);
}
