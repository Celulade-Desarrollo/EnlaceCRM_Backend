import { getFacturasPendientesUseCase } from "../../application/usecases/alpina/getFacturasPendientesUseCase.js";
import { logger } from "../../config/logger.js";
import ValidationError from "../../errors/Validation.error.js";

export const obtenerFacturas = async (req, res) => {
  try {
    const { identificadorTendero } = req.body;

    if (!identificadorTendero) {
      throw new ValidationError("El identificador del tendero es requerido");
    }

    const facturas = await getFacturasPendientesUseCase(identificadorTendero);
    res.status(200).json(facturas);

  } catch (error) {
    logger.error("Error en el controlador Alpina (facturas):", {
      mensaje: error.message,
      stack: error.stack
    });

    const statusCode = error instanceof ValidationError ? 400 : 500;
    const mensaje = error.message;

    res.status(statusCode).json({ mensaje });
  }
};


// import { getFacturasPendientesUseCase } from "../../application/usecases/alpina/getFacturasPendientesUseCase.js";

// export const obtenerFacturas = async (req, res) => {
//   try {
//     const { identificadorTendero } = req.body;

//     if (!identificadorTendero) {
//       throw new Error("El identificador del tendero es requerido");
//     }

//     const facturas = await getFacturasPendientesUseCase(identificadorTendero);
//     res.status(200).json(facturas);
//   } catch (error) {
//     console.error("Error en el controlador Alpina (facturas):", error.message);

//     const isValidationError =
//       error.message.includes("requerido") || error.message.includes("válido");

//     const statusCode = isValidationError ? 400 : 500;
//     const mensaje = isValidationError
//       ? error.message
//       : "Error interno del servidor";

//     res.status(statusCode).json({ mensaje });
//   }
// };


// // import { getFacturasPendientesUseCase } from "../../application/usecases/alpina/getFacturasPendientesUseCase.js";

// // export const obtenerFacturas = async (req, res) => {
// //   try {
// //     const facturas = await getFacturasPendientesUseCase();
// //     res.status(200).json(facturas);
// //   } catch (error) {
// //     console.error("Error en el controlador Alpina (facturas):", error.message);

// //     const isValidationError =
// //       error.message.includes("requerido") || error.message.includes("válido");

// //     const statusCode = isValidationError ? 400 : 500;
// //     const mensaje = isValidationError
// //       ? error.message
// //       : "Error interno del servidor";

// //     res.status(statusCode).json({ mensaje });
// //   }
// // };
