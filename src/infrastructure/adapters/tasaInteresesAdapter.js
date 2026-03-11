import { TasaInteresesPort } from "../../domain/ports/TasaInteresesPort.js";
import { tasaInteresesRepository } from "../repositories/tasaIntereses.repository.js";

export class TasaInteresesAdapter extends TasaInteresesPort {
  
  async actualizarTasaIntereses(id, valorFactorSeguro, tasaEfectivaAnual, diasDuracionCuota) {
    return await tasaInteresesRepository.actualizarTasaIntereses
    (
      id, valorFactorSeguro, tasaEfectivaAnual, diasDuracionCuota, diasDuracionCuota
    );
  }
}