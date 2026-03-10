import { tasaInteresesService } from "../../services/tasaInteresesService.js";

export async function updateTasaInteresesUseCase(id, valorFactorSeguro, tasaEfectivaAnual) {
  return await tasaInteresesService.actualizarTasaIntereses(id, valorFactorSeguro, tasaEfectivaAnual);
}