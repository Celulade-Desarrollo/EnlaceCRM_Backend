import { bancowService } from "../../services/bancowServiceInstance.js"

export async function updateCoreBancarioUseCase(id, input) {
    await bancowService.actualizarCoreBancario(id, input)
}