import { bancowService } from "../../services/bancowServiceInstance.js";

export async function deleteRegistroBancowUseCase(id) {

    await bancowService.eliminarPorIdFlujoRegistro(id)
    return {
        mensaje: "Registro eliminado correctamente",
    };
}