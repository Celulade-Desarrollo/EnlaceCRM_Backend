import { getFacturasPendientesUseCase } from "../../application/usecases/alpina/getFacturasPendientesUseCase.js";

export const obtenerFacturas = async (req, res) => {
  try {
    const { identificadorTendero } = req.query;

    const identificadorSanitizado = identificadorTendero?.trim();

    const facturas = await getFacturasPendientesUseCase(identificadorSanitizado);
    res.status(200).json(facturas);
  } catch (error) {
    console.error("Error en el controlador Alpina (facturas):", error.message);

    const isValidationError =
      error.message.includes("requerido") || error.message.includes("válido");

    const statusCode = isValidationError ? 400 : 500;
    const mensaje = isValidationError
      ? error.message
      : "Error interno del servidor";

    res.status(statusCode).json({ mensaje });
  }
};


