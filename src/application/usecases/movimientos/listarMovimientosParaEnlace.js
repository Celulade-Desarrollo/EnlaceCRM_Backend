import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";

export async function listarMovimientosParaEnlace() {
    return await estadoCuentaService.obtenerTodosLosMovimientos();
}