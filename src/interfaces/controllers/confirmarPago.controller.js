import { confirmarPagoUseCase } from "../../application/usecases/pagos/confirmarPagoUseCase.js";
import { estadoCuentaAdapter } from "../../infrastructure/adapters/estadoCuentaAdapter.js";

export const confirmarPagoController = async (req, res) => {
  console.log("🟡 Body recibido en controlador:", req.body); // 👈 Agregado
  try {
    const {
      identificadorTendero,
      monto,
      descripcion,
      fechaPagoProgramado,
    } = req.body;

    const resultado = await confirmarPagoUseCase(estadoCuentaAdapter, {
      identificadorTendero,
      monto,
      descripcion,
      fechaPagoProgramado,
    });

    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error en confirmarPagoController:", error.message);

    if (error.message.includes("requeridos") || error.message.includes("válidos")) {
      return res.status(400).json({ mensaje: error.message });
    }

    res.status(500).json({ mensaje: "Error interno al confirmar pago" });
  }
};
