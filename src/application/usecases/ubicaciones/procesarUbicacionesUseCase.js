import { UbicacionesAdapter } from "../../../infrastructure/adapters/UbicacionesAdapter.js";
import { logger } from "../../../config/logger.js";

export async function procesarUbicacionesUseCase() {
  try {
    // Llamamos al método correcto del adaptador
    const ubicaciones = await UbicacionesAdapter.extraerDireccionesDesdePDF();

    return {
      totalProcesadas: ubicaciones.length,
      ubicaciones, // opcional: para devolverlas también
      mensaje: "Ubicaciones procesadas correctamente",
    };
  } catch (error) {
    logger.error("[UseCase][procesarUbicaciones] Error:", {
      message: error.message,
      stack: error.stack,
    });
    throw new Error("No se pudieron procesar las ubicaciones desde el PDF");
  }
}

export async function obtenerUbicacionesUseCase() {
  try {
    // Si más adelante tienes un servicio o repositorio real de ubicaciones, lo reemplazas aquí
    const ubicaciones = []; // temporal: podrías leer de la BD o cache
    return ubicaciones;
  } catch (error) {
    logger.error("[UseCase][obtenerUbicaciones] Error:", {
      message: error.message,
      stack: error.stack,
    });
    throw new Error("No se pudieron obtener las ubicaciones");
  }
}