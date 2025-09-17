import { bajarAbonosRepository } from "../repositories/bajarAbonos.repository.js";
import { BajarAbonosPort } from "../../domain/ports/BajarAbonosPort.js";

export class BajarAbonosAdapter extends BajarAbonosPort {
  async obtenerDatosExcel() {
    return await bajarAbonosRepository.obtenerDatosExcel();
  }
}
