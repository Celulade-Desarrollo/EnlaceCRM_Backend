import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

export async function getFlujoRegistroByNumeroCelular(numeroCelular) {
  return await flujoRegistroService.obtenerPorNumeroCelular(numeroCelular);
}
