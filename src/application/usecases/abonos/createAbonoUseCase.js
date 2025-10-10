import { abonoService } from "../../services/abonoServiceInstance.js";
import { Abono } from "../../../domain/models/Abono.js";

export async function createAbonoUseCase(dataArray) {
  let successCount = 0;
  let errorCount = 0;
  let errores = [];

  for (const [index, row] of dataArray.entries()) {
    try {
      const abono = new Abono(row);
      abono.validarDatos();
      await abonoService.insertarAbono(abono);
      successCount++;
    } catch (error) {
      errorCount++;
      errores.push({ fila: index + 1, error: error.message });
    }
  }

  return { successCount, errorCount, errores };
}
