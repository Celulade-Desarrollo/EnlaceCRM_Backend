import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";

export async function calcularInteresesUseCase(idMovimiento, nuevoMonto) {
   return await estadoCuentaService.actualizarMontoMovimiento(idMovimiento, nuevoMonto);
}


