import { bancowService } from "../services/bancowServiceInstance";
import { Bancow } from "../../domain/models/Bancow";

export async function createRegistroBancowUseCase(input) {

    // Se instancia el modelo inicial del registro de bancow 
    const registro = new Bancow(input)

    // Se valida si ya hay un registro con el mismo id 
    const duplicado = await bancowService.verificarDuplicadosPorIdFlujoRegistro(registro)
    if (duplicado) {
        throw new Error("Ya existe un registro con este mismo id")
    }

    await bancowService.crearRegistro(registro)
    return {
        mensaje: "Registro creado exitosamente",
    };

}