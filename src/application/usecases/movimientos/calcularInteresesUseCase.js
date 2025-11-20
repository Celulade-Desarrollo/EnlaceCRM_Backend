import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";

export async function calcularInteresesUseCase(idMovimiento, nuevoMonto, Intereses, InteresesMora, Fees) {
   return await estadoCuentaService.actualizarMontoMovimiento(idMovimiento, nuevoMonto, Intereses, InteresesMora, Fees);
}


