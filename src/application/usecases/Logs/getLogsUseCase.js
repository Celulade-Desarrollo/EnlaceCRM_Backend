import { LogsService } from "../../services/LogsService.js";

export async function getLogsUseCase(){
    return await LogsService.obtenerTodosLosLogs()
}