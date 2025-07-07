import { confirmarPagoUseCase } from "../../application/usecases/pagos/confirmarPagoUseCase.js";
import { estadoCuentaService } from "../../application/services/estadoCuentaServiceInstance.js";
import ValidationError from "../../errors/Validation.error.js"; // Asegúrate que esta ruta sea correcta

export const confirmarPagoController = async (req, res) => {
  try {
    const {
      identificadorTendero,
      monto,
      descripcion,
      fechaPagoProgramado,
      idMedioPago,
      nroFacturaAlpina,
      telefonoTransportista
    } = req.body;

    console.log("🟡 Body recibido en controlador:", req.body);

    const resultado = await confirmarPagoUseCase(estadoCuentaService, {
      identificadorTendero,
      monto,
      descripcion,
      fechaPagoProgramado,
      idMedioPago,
      nroFacturaAlpina,
      telefonoTransportista
    });

    res.status(201).json(resultado);
  } catch (error) {
    console.error("❌ Error en confirmarPagoController:", error.message);

    if (error instanceof ValidationError) {
      return res.status(400).json({ mensaje: error.message });
    }

    res.status(500).json({ mensaje: "Error interno al confirmar pago" });
  }
};
