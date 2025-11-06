import ubicacionMapaService from "../../services/ubicacionMapaServiceInstance.js";
import { logger } from "../../../config/logger.js";

export async function obtenerUbicacionesUseCase() {
  try {
    return await ubicacionMapaService.obtenerUbicaciones();
  } catch (error) {
    logger.error("[UseCase][obtenerUbicaciones] Error:", {
      message: error.message,
      stack: error.stack,
    });
    throw new Error("No se pudieron obtener las ubicaciones");
  }
}