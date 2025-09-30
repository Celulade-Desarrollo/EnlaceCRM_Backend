import { flujoRegistroService } from "../../services/flujoRegistroServiceInstance.js";
import { FlujoRegistro } from "../../../domain/models/FlujoRegistro.js";

export async function createFlujoRegistroUseCase(input) {
  const registro = new FlujoRegistro(input);

  const duplicado = await flujoRegistroService.verificarDuplicados(registro);
  if (duplicado) {
    throw new Error("Ya existe un registro con los mismos datos (cédula, celular o correo).");
  }
  await flujoRegistroService.insertarRegistro(registro);

  return {
    mensaje: "Registro creado exitosamente",
  };
}
