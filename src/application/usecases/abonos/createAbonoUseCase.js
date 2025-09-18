import { abonoService } from "../../services/abonoServiceInstance.js";
import { Abono } from "../../../domain/models/Abono.js";

export async function createAbonoUseCase(dataArray) {
  for (const row of dataArray) {
    const abono = new Abono(row);
    abono.validarDatos();
    await abonoService.insertarAbono(abono);
  }
}
