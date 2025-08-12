import { ubicacionService } from "../../../application/services/ubicacionServiceInstance.js";
 
export async function getBarriosUseCase(idCiudad) {
  return await ubicacionService.obtenerBarrios(idCiudad);
}
 