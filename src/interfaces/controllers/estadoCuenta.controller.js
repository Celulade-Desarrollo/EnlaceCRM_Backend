import { getEstadoCuentaUseCase } from "../../application/usecases/pagos/getEstadoCuentaUseCase.js";

export const obtenerEstadoCuentaController = async (req, res) => {
  try {
    const { identificadorTendero } = req.query;

    if (!identificadorTendero) {
      return res.status(400).json({ mensaje: "Se requiere el identificador del tendero" });
    }

    const estadoCuenta = await getEstadoCuentaUseCase(identificadorTendero);
    res.status(200).json(estadoCuenta);

  } catch (error) {
    console.error("Error en el controlador EstadoCuenta:", error.message);

    const isValidationError =
      error.name === 'ValidationError' || error.code === 'VALIDATION_ERROR';   
    const statusCode = isValidationError ? 400 : 500;
    const mensaje = isValidationError
      ? error.message
      : "Error interno del servidor";

    res.status(statusCode).json({ mensaje });
  }
};
