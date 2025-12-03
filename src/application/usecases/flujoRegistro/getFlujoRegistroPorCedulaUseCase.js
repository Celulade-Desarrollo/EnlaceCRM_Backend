import { flujoRegistroService } from "../../services/flujoRegistroServiceInstance.js";

export async function   getFlujoRegistroPorCedula(cedulaCliente) {
  return await flujoRegistroService.obtenerPorCedulaCliente(cedulaCliente);
}
