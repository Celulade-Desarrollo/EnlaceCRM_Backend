import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";

export async function getRecaudoFromEstadoCuentaServiceUseCase() {
    return await estadoCuentaService.consultarRecaudoTransportistaPorFecha();
}