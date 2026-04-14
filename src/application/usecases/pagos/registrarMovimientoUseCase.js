import { ValidationError } from "../../../errors/Validation.error.js";
import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";
import { Movimiento } from "../../../domain/models/Movimiento.js";
import {registrarMovimientoTipoDosUseCase} from "./registrarMovimientoTipoDosUseCase.js"
import { LogsService } from "../../services/LogsService.js";
import { LOGS_TYPE } from "../../../constants/LogsType.js";

export const registrarMovimientoUseCase = async (datosMovimiento = {}) => {
  try {
    if (!datosMovimiento.identificadorTendero || !datosMovimiento.monto || !datosMovimiento.tipoMovimiento) {
      throw new ValidationError("Campos obligatorios faltantes");
    }

    const movimiento = new Movimiento(datosMovimiento);
    // Intento normal
    const resultado = await estadoCuentaService.registrarMovimiento(movimiento);

    try {
        await LogsService.generarLog(
            datosMovimiento.identificadorTendero,
            "Tendero",
            LOGS_TYPE.PAGO,
            new Date(),
            `Pago registrado exitosamente por un monto de ${datosMovimiento.monto}`
        );
    } catch (logError) {
        console.error("Error registrando log de pago", logError);
    }

    return resultado;

  } catch (error) {
    // --- NUEVA LÓGICA DE LOGS ---
    try {
      // Registramos el fallo de forma silenciosa para no romper el flujo del error original
      await estadoCuentaService.registrarMovimientoFallido({
        identificadorTendero: datosMovimiento.identificadorTendero,
        monto: datosMovimiento.monto,
        descripcion: datosMovimiento.descripcion || "Intento de pago",
        nroFacturaAlpina: datosMovimiento.nroFacturaAlpina,
        errorMensaje: error.message
      });
    } catch (logError) {
      console.error("Error crítico: No se pudo ni siquiera registrar el log del fallo", logError);
    }
    
    // Re-lanzamos el error para que el controlador lo maneje
    throw error;
  }
};

