import { ValidationError } from "../../../errors/Validation.error.js";
import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";
import { Movimiento } from "../../../domain/models/Movimiento.js";

export const registrarMovimientoUseCase = async (datosMovimiento = {}, service = estadoCuentaService) => {
  try {
    if (
      !datosMovimiento.identificadorTendero ||
      !datosMovimiento.monto ||
      !datosMovimiento.tipoMovimiento
    ) {
      throw new ValidationError("Campos obligatorios faltantes: identificadorTendero, monto, tipoMovimiento");
    }

    const movimiento = new Movimiento(datosMovimiento);
    return await service.registrarMovimiento(movimiento);

  } catch (error) {
    throw error;
  }
};
