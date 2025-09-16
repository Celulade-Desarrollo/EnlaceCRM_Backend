import {getLogsUseCase} from "../../application/usecases/Logs/getLogsUseCase.js";

export async function obtenerTodosLogs(req, res){
    try {
        const logsData = await getLogsUseCase()
        res.status(200).json(logsData)
    } catch (err) {
      res.status(400).json({ error: err.message });
    }}