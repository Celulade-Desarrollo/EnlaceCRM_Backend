import { ubicacionService } from "../../../application/services/ubicacionServiceInstance.js";
 
export async function getDepartamentosUseCase() {
  return await ubicacionService.obtenerDepartamentos();
}
 