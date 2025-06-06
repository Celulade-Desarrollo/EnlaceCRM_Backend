import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

export async function getFlujoRegistroByEstado(estado) {
  return await flujoRegistroService.obtenerPorEstado(estado);
}

