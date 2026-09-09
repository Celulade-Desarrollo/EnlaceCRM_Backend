import { flujoRegistroService } from "../../services/flujoRegistroServiceInstance.js";
import { FlujoRegistro } from "../../../domain/models/FlujoRegistro.js";
import { LogsService } from "../../services/LogsService.js";
import { LOGS_TYPE } from "../../../constants/LogsType.js";

export async function createFlujoRegistroUseCase(input) {
  const registro = new FlujoRegistro(input);

  const duplicado = await flujoRegistroService.verificarDuplicados(registro);
  if (duplicado) {
    throw new Error("Ya existe un registro con los mismos datos (cédula, celular o correo).");
  }
  await flujoRegistroService.insertarRegistro(registro);

  // Generar log si el usuario aceptó la política de tratamiento de datos personales
  try {
    if (registro.Autorizacion_Habeas_Data) {
      await LogsService.generarLog(
        registro.Cedula_Cliente,
        "Cliente",
        LOGS_TYPE.CREACION_USUARIO,
        new Date(),
        "usuario aceptó politica de tratamiento de datos personales"
      );
    }
  } catch (err) {
    // No detener el flujo principal si falla el log
    console.error("Error generando log de habeas data:", err);
  }

  return {
    mensaje: "Registro creado exitosamente",
  };
}
