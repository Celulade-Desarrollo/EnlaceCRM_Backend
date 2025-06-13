import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

export async function getFlujoRegistroById(id) {
  return await flujoRegistroService.obtenerPorId(id);
}

