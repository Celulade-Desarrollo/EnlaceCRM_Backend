import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

export async function getFlujoRegistroByAlpina(alpinaId) {
  return await flujoRegistroService.obtenerPorNumeroClienteAlpina(alpinaId);
}
