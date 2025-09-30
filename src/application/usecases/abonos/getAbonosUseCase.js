//import { bajarAbonoService } from "../../services/bajarAbonoServiceInstance.js";

import { abonoService } from "../../services/abonoServiceInstance.js";

export async function getExcelData() {
  return await abonoService.obtenerDatosExcel();
}
