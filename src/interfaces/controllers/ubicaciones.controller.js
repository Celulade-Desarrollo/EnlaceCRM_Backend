import { procesarUbicacionesUseCase } from "../../application/usecases/ubicacionMapa/procesarUbicacionesUseCase.js";
import { obtenerUbicacionesUseCase } from "../../application/usecases/ubicacionMapa/obtenerUbicacionesUseCase.js";
import { logger } from "../../config/logger.js";

export const procesarUbicacionesController = async (req, res) => {
  try {
    const resultado = await procesarUbicacionesUseCase();
    res.status(200).json(resultado);
  } catch (error) {
    logger.error("Error en el controlador procesarUbicaciones", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ mensaje: "Error al procesar ubicaciones" });
  }
};

export const obtenerUbicacionesController = async (req, res) => {
  try {
    const ubicaciones = await obtenerUbicacionesUseCase();
    res.status(200).json(ubicaciones);
  } catch (error) {
    logger.error("Error en el controlador obtenerUbicaciones", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ mensaje: "Error al obtener ubicaciones" });
  }
};