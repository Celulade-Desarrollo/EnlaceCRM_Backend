import { estadoCuentaAdapter } from "../../../infrastructure/adapters/estadoCuentaAdapter.js";

export async function getEstadoCuentaUseCase(idUsuarioFinal) {
  if (!idUsuarioFinal) {
    throw new Error("Se requiere el identificador del usuario final");
  }

  try {
    const [movimientos, cupoDisponible, fechaSiguienteAbono, bloqueoMora] = await Promise.all([
      estadoCuentaAdapter.obtenerEstadoCuenta(idUsuarioFinal),
      estadoCuentaAdapter.obtenerCupoDisponible(idUsuarioFinal),
      estadoCuentaAdapter.obtenerFechaSiguienteAbono?.(idUsuarioFinal),
      estadoCuentaAdapter.estaBloqueadoPorMora?.(idUsuarioFinal)
    ]);

    return {
      deudaTotal: calcularDeudaTotal(movimientos),
      cupoDisponible,
      fechaSiguienteAbono: fechaSiguienteAbono || null,
      bloqueoPorMora: bloqueoMora || false,
      movimientos,
      proveedoresHabilitados: [] // pendiente implementar si aplica
    };
  } catch (error) {
    console.error("[UseCase][getEstadoCuenta] Error:", error.message);
    throw new Error("No se pudo obtener el estado de cuenta");
  }
}

function calcularDeudaTotal(movimientos) {
  return movimientos
    .filter(m => m.IdTipoMovimiento === 1 && m.IdEstadoMovimiento !== 3) // Deudas activas
    .reduce((total, m) => total + parseFloat(m.Monto || 0), 0);
}
