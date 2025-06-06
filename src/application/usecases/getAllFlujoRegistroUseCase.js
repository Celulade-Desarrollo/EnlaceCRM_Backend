// import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

// export async function getAllFlujoRegistroUseCase() {
//   return await flujoRegistroService.obtenerTodos();
// }

import { flujoRegistroService } from "../services/flujoRegistroServiceInstance.js";

export async function getAllFlujoRegistro() {
  return await flujoRegistroService.obtenerTodos();
}
