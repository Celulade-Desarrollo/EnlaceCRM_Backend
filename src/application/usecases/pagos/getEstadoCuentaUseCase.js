import { estadoCuentaService } from "../../services/estadoCuentaServiceInstance.js";
import { EstadoCuenta } from "../../../domain/models/EstadoCuenta.js";

export async function getEstadoCuentaUseCase(idUsuarioFinal) {
  if (!idUsuarioFinal) {
    throw new Error("Se requiere el identificador del usuario final");
  }

  try {
    const [movimientos, cupoDisponible, fechaSiguienteAbono, bloqueoMora] = await Promise.all([
      estadoCuentaService.obtenerEstadoCuenta(idUsuarioFinal),
      estadoCuentaService.obtenerCupoDisponible(idUsuarioFinal),
      estadoCuentaService.obtenerFechaSiguienteAbono?.(idUsuarioFinal),
      estadoCuentaService.estaBloqueadoPorMora?.(idUsuarioFinal)
    ]);

    const estadoCuenta = new EstadoCuenta({
      movimientos,
      cupoDisponible,
      fechaSiguienteAbono,
      bloqueoPorMora: bloqueoMora
    });

    return estadoCuenta;
  } catch (error) {
    console.error("[UseCase][getEstadoCuenta] Error:", error.message);
    throw new Error("No se pudo obtener el estado de cuenta");
  }
}
