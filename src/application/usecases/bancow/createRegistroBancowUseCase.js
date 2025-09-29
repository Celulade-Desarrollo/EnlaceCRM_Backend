import { bancowService } from "../../services/bancowServiceInstance.js";
import { Bancow } from "../../../domain/models/Bancow.js";
import { LogsService } from "../../services/LogsService.js";
import { LOGS_TYPE } from "../../../constants/LogsType.js";
import { tokenVerifierService } from "../../services/TokenVerifierService.js";


export async function createRegistroBancowUseCase(input, token) {

    // Se instancia el modelo inicial del registro de bancow 
    const registro = new Bancow(input)


    // Se valida si ya hay un registro con el mismo id 
    const duplicado = await bancowService.verificarDuplicadosPorIdFlujoRegistro(registro.IdFlujoRegistro)
    if (duplicado) {
        throw new Error("Ya existe un registro con este mismo id")
    }

        const tokenData = await tokenVerifierService.verifyToken(token);

        await LogsService.generarLog(tokenData.cedula, "Banco W", LOGS_TYPE.APROBACION_CUPO, new Date(), `El usuario ${tokenData.cedula} ha aprobado el cupo sugerido para el cliente con IdFlujoRegistro ${registro.IdFlujoRegistro}`  )
    await bancowService.crearRegistro(registro)
        
    return {
        mensaje: "Registro creado exitosamente",
    };

}