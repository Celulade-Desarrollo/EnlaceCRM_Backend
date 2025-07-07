import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";
import { Pago } from "../../../domain/models/Pago.js";

export const confirmarPagoUseCase = async (datosPago = {}) => {
  const pago = new Pago(datosPago);

  return await estadoCuentaService.registrarPago(pago);
};
