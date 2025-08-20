import { bancowService } from "../../services/bancowServiceInstance.js"
import {flujoRegistroService} from "../../services/flujoRegistroServiceInstance.js"
export async function updateCoreBancarioUseCase(id, input) {
    const estado = "completado"
    await flujoRegistroService.actualizarEstadoPorId(id, estado)
    await bancowService.actualizarCoreBancario(id, input)
}