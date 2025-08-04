import { movimientoAdapter } from '../../infrastructure/adapters/MovimientoAdapter.js';

/**
 * Controlador para validar un movimiento de pago.
 * @param {import('express').Request} req - El objeto de solicitud de Express.
 * @param {import('express').Response} res - El objeto de respuesta de Express.
 */
export const validarMovimiento = async (req, res) => {
  try {
    const { cedula, nrosFacturaAlpina } = req.body;

    // Validación básica de los datos de entrada
    if (!cedula || !Array.isArray(nrosFacturaAlpina) || nrosFacturaAlpina.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos. Se requiere "cedula" (string) y "nrosFacturaAlpina" (array no vacío).',
      });
    }

    // Llama al adapter, que a su vez llama al caso de uso
    const resultado = await movimientoAdapter.validar({ cedula, nrosFacturaAlpina });

    // Si la validación de negocio no es exitosa
    if (!resultado.esValido) {
      return res.status(400).json({
        success: false,
        message: resultado.mensaje,
      });
    }

    // Si la validación es exitosa
    res.status(200).json({
      success: true,
      message: resultado.mensaje,
      data: {
        montoRecomendado: resultado.montoRecomendado,
        montoMinimo: resultado.montoMinimo,
      },
    });
  } catch (error) {
    console.error('Error en el controlador de validación de movimiento:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al validar el movimiento.',
    });
  }
};

/**
 * Controlador para crear un nuevo movimiento de pago.
 * @param {import('express').Request} req - El objeto de solicitud de Express.
 * @param {import('express').Response} res - El objeto de respuesta de Express.
 */
export const crearMovimientoPago = async (req, res) => {
  try {
    const { cedula, monto, facturasSeleccionadas, idMedioPago } = req.body;

    // Validación básica de los datos de entrada
    if (!cedula || !monto || !Array.isArray(facturasSeleccionadas) || facturasSeleccionadas.length === 0 || !idMedioPago) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos. Se requieren "cedula", "monto", "facturasSeleccionadas" (array) y "idMedioPago".',
      });
    }

    // Llama al adapter, que a su vez llama al caso de uso de creación
    const movimientoCreado = await movimientoAdapter.crearPago(req.body);

    res.status(201).json({
      success: true,
      message: 'Movimiento de pago creado exitosamente.',
      data: movimientoCreado,
    });

  } catch (error) {
    // Los errores de validación de negocio (lanzados desde el caso de uso) se capturan aquí
    console.error('Error en el controlador de creación de movimiento:', error);

    // Si el error es una de nuestras validaciones de negocio, devolvemos 400.
    const isBusinessError = error.message.includes('menor al monto mínimo') ||
                            error.message.includes('exceder el total') ||
                            error.message.includes('bloqueado por mora');

    res.status(isBusinessError ? 400 : 500).json({
      success: false,
      message: error.message || 'Error interno del servidor al crear el movimiento.',
    });
  }
};