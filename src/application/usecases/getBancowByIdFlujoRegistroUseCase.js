import { bancowService } from "../services/bancowServiceInstance";

export async function getBancowByIdFlujoRegistro(id) {
    return await bancowService.obtenerPorIdFlujoRegistro(id)
}   