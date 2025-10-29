import ubicacionMapaService from "../../services/ubicacionMapaServiceInstance.js";
import { logger } from "../../../config/logger.js";

export async function procesarUbicacionesUseCase() {
  try {
    const ubicaciones = await ubicacionMapaService.procesarUbicacionesDesdePDF();
    return {
      totalProcesadas: ubicaciones.length,
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