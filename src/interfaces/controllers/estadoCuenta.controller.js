import { estadoCuentaService } from "../../application/services/estadoCuentaServiceInstance.js";

export const obtenerEstadoCuentaController = async (req, res) => {
  try {
    const { identificadorTendero } = req.query;

    // Let the use case handle validation for consistency
    const identificadorSanitizado = identificadorTendero?.trim();

    const resultado = await estadoCuentaService.obtenerEstadoCuenta(identificadorSanitizado);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error en el controlador EstadoCuenta:", error.message);
    const isValidationError =
      error.message.includes("requerido") || error.message.includes("válido");
    const statusCode = isValidationError ? 400 : 500;
    const mensaje = isValidationError
      ? error.message
      : "Error interno del servidor";
    res.status(statusCode).json({ mensaje });
  }
};