// import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

// export async function updateEstadoFlujoRegistroUseCase(id, estado) {
//   return await flujoRegistroService.actualizarEstadoPorId(id, estado);
// }

import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

export async function updateEstadoFlujoRegistro(id, estado) {
  return await flujoRegistroService.actualizarEstadoPorId(id, estado);
}
