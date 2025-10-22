import { bancowService } from "../../services/bancowServiceInstance.js"
import {flujoRegistroService} from "../../services/flujoRegistroServiceInstance.js"
import { LogsService } from "../../services/LogsService.js";
import { LOGS_TYPE } from "../../../constants/LogsType.js";
import { tokenVerifierService } from "../../services/TokenVerifierService.js";

export async function updateCoreBancarioUseCase(id, input, token) {
    const estado = "confirmado";

    const tokenData = await tokenVerifierService.verifyToken(token);

    await LogsService.generarLog(tokenData.cedula, "Banco W", LOGS_TYPE.EDICION_CORE_BANCARIO, new Date(), `El usuario ${tokenData.cedula} de banco w ha editado el core bancario para el cliente con IdFlujoRegistro ${id}`  )
    await flujoRegistroService.actualizarEstadoPorId(id, estado)
    await bancowService.actualizarCoreBancario(id, input)
}