import { getEstadoCuentaUseCase } from "../../application/usecases/pagos/getEstadoCuentaUseCase.js";
import { logger } from "../../config/logger.js";

export const obtenerEstadoCuentaController = async (req, res) => {
  try {
    const { identificadorTendero } = req.query;

    if (!identificadorTendero) {
      return res.status(400).json({ mensaje: "Se requiere el identificador del tendero" });
    }

    const estadoCuenta = await getEstadoCuentaUseCase(identificadorTendero);
    res.status(200).json(estadoCuenta);

  } catch (error) {
    logger.error("Error en el controlador EstadoCuenta", {
      message: error.message,
      stack: error.stack,
      tendero: req.query?.identificadorTendero
    });

    const isValidationError =
      error.name === 'ValidationError' || error.code === 'VALIDATION_ERROR';   

    const statusCode = isValidationError ? 400 : 500;
    const mensaje = isValidationError
      ? error.message
      : "Error interno del servidor";

    res.status(statusCode).json({ mensaje });
  }
};

