import { flujoRegistroService } from "../../services/flujoRegistroServiceInstance.js";

export async function updateClienteAcepto(id, respuestaCliente) {
  return await flujoRegistroService.actualizarclienteAcceptoPorId(id, respuestaCliente);
}
