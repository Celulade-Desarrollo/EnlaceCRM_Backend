import { dispersionService } from "../../services/dispersionService.js";

export async function updateEstadoBancoStatus(id, estado) {
  return await dispersionService.actualizarEstadoPorId(id, estado);
}
