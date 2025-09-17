import { bajarAbonoService } from "../../services/bajarAbonoServiceInstance.js";

export async function getExcelData() {
  return await bajarAbonoService.obtenerDatosExcel();
}
