import { bancowService } from "../services/bancowServiceInstance";

export async function deleteRegistroBancowUseCase(id) {

    await bancowService.eliminarPorIdFlujoRegistro(id)
    return {
        mensaje: "Registro eliminado correctamente",
    };
}