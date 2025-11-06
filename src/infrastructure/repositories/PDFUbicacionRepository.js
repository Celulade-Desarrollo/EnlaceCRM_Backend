import { UbicacionesAdapter } from "../adapters/UbicacionesAdapter.js";
export default class PDFUbicacionRepository {
  async procesarUbicacionesDesdePDF() {
    const ubicaciones = await UbicacionesAdapter.extraerUbicacionesDesdePDF();
    return ubicaciones;
  }
}