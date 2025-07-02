import { confirmarPagoUseCase } from "../../application/usecases/pagos/confirmarPagoUseCase.js";
import { pagoService } from "../../application/services/pagoServiceInstance.js";


export const confirmarPagoController = async (req, res) => {
  try {
    const {
      identificadorTendero,
      monto,
      descripcion,
      fechaPagoProgramado,
    } = req.body;

    if (!identificadorTendero || !monto) {
      return res.status(400).json({
        mensaje: "identificadorTendero y monto son requeridos",
      });
    }

    const resultado = await confirmarPagoUseCase(pagoService, {
      identificadorTendero,
      monto,
      descripcion,
      fechaPagoProgramado,
    });

    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error en confirmarPagoController:", error.message);
    res.status(500).json({ mensaje: "Error interno al confirmar pago" });
  }
};
