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

    const resultado = await confirmarPagoUseCase(pagoService, {
      identificadorTendero,
      monto,
      descripcion,
      fechaPagoProgramado,
    });    
    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error en confirmarPagoController:", error.message);
    
    // Handle validation errors differently
    if (error.message.includes("requeridos") || error.message.includes("válidos")) {
      return res.status(400).json({ mensaje: error.message });
    }
    
    res.status(500).json({ mensaje: "Error interno al confirmar pago" });
  }};
