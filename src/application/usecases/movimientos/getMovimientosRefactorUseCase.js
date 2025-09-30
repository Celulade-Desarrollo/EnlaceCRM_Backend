import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";

export async function getMovimientosUseCase(IdUsuarioFinal){
   return await estadoCuentaService.obtenerMovimientosPorClienteUltimosTresMeses(IdUsuarioFinal);
}