import { bancowService } from "../../services/bancowServiceInstance.js";

export async function getExcelData() {
    return await bancowService.obtenerDatosExcel()
}
