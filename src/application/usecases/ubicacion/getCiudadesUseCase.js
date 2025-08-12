import { ubicacionService } from "../../../application/services/ubicacionServiceInstance.js";
 
export async function getCiudadesUseCase(idDepartamento) {
  return await ubicacionService.obtenerCiudades(idDepartamento);
}