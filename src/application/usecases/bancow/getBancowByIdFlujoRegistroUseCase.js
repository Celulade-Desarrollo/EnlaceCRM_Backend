import { bancowService } from "../../services/bancowServiceInstance.js";

export async function getBancowByIdFlujoRegistro(id) {
    return await bancowService.obtenerPorIdFlujoRegistro(id)
}   