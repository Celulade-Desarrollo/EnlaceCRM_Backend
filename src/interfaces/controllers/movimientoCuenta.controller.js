import { registrarMovimientoUseCase } from "../../application/usecases/pagos/registrarMovimientoUseCase.js";
import ValidationError from "../../errors/Validation.error.js";

export const registrarMovimientoController = async (req, res) => {
  try {
    const {
      identificadorTendero,
      monto,
      descripcion,
      fechaPagoProgramado,
      idMedioPago,
      nroFacturaAlpina,
      telefonoTransportista,
      tipoMovimiento // 1 = débito, 2 = crédito
    } = req.body;

    console.log("🟡 Body recibido en controlador:", req.body);

    const resultado = await registrarMovimientoUseCase({
      identificadorTendero,
      monto,
      descripcion,
      fechaPagoProgramado,
      idMedioPago,
      nroFacturaAlpina,
      telefonoTransportista,
      tipoMovimiento
    });

    res.status(201).json(resultado);
  } catch (error) {
    console.error("❌ Error en registrarMovimientoController:", error.message);

    if (error instanceof ValidationError) {
      return res.status(400).json({ mensaje: error.message });
    }

    res.status(500).json({ mensaje: "Error interno al registrar movimiento" });
  }
};

// import { confirmarPagoUseCase } from "../../application/usecases/pagos/confirmarPagoUseCase.js";
// import ValidationError from "../../errors/Validation.error.js";

// export const confirmarPagoController = async (req, res) => {
//   try {
//     const {
//       identificadorTendero,
//       monto,
//       descripcion,
//       fechaPagoProgramado,
//       idMedioPago,
//       nroFacturaAlpina,
//       telefonoTransportista
//     } = req.body;

//     console.log("🟡 Body recibido en controlador:", req.body);

//     const resultado = await confirmarPagoUseCase({
//       identificadorTendero,
//       monto,
//       descripcion,
//       fechaPagoProgramado,
//       idMedioPago,
//       nroFacturaAlpina,
//       telefonoTransportista
//     });

//     res.status(201).json(resultado);
//   } catch (error) {
//     console.error("❌ Error en confirmarPagoController:", error.message);

//     if (error instanceof ValidationError) {
//       return res.status(400).json({ mensaje: error.message });
//     }

//     res.status(500).json({ mensaje: "Error interno al confirmar pago" });
//   }
// };

