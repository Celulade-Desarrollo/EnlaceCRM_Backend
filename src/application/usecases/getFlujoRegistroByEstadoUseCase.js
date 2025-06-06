// import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

// export async function getFlujoRegistroByEstadoUseCase(estado) {
//   return await flujoRegistroService.obtenerPorEstado(estado);
// }

import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

export async function getFlujoRegistroByEstado(estado) {
  return await flujoRegistroService.obtenerPorEstado(estado);
}

