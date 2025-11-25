import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";

export async function consultarRecaudoTransportistaUseCase(numTransportista) {
    return await estadoCuentaService.consultarRecaudoTransportista(numTransportista);
}