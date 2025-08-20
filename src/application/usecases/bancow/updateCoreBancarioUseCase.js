import { bancowService } from "../../services/bancowServiceInstance.js"
import {flujoRegistroService} from "../../services/flujoRegistroServiceInstance.js"
export async function updateCoreBancarioUseCase(id, input) {
    await flujoRegistroService.actualizarEstadoPorId(id, estado="completado")
    await bancowService.actualizarCoreBancario(id, input)
}