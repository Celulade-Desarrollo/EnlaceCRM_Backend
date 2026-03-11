import { tasaInteresesService } from "../../services/tasaInteresesService.js";

export async function updateTasaInteresesUseCase(id, valorFactorSeguro, tasaEfectivaAnual, diasDuracionCuota) {
  return await tasaInteresesService.actualizarTasaIntereses(id, valorFactorSeguro, tasaEfectivaAnual, diasDuracionCuota);
}