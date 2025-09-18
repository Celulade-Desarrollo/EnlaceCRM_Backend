import { logsRepository } from "../repositories/Logs.repository.js";
import { LogsPort } from "../../domain/ports/LogsPort.js";
import { LOGS_TYPE_NAMES } from "../../constants/LogsType.js";   

export class LogsAdapter extends LogsPort {
    async generarLog(Usuario, Rol, Proceso, Fecha, Descripcion) {
        const nombreProceso = LOGS_TYPE_NAMES[Proceso];

        return await logsRepository.generarLog(
            Usuario,
            Rol,
            nombreProceso,
            Fecha,
            Descripcion
        );
    }
    async obtenerTodosLosLogs() {
        return await logsRepository.obtenerTodosLosLogs();
    }
}