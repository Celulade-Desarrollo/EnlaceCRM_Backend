import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";
import { Pago } from "../../../domain/models/Pago.js";

export const confirmarPagoUseCase = async (datosPago = {}, service = estadoCuentaService) => {
  try {
    const pago = new Pago(datosPago);
    return await service.registrarPago(pago);
  } catch (error) {
    if (
      error.message.includes('identificadorTendero') ||
      error.message.includes('monto')
    ) {
      throw new ValidationError(error.message);
    }
    throw error;
  }
};