import { movimientoUseCase } from "../../application/usecases/movimientos/createMovimientoUseCase.js";

/**
 * Controlador para manejar la validación de movimientos.
 * @param {import('express').Request} req - El objeto de la petición Express.
 * @param {import('express').Response} res - El objeto de la respuesta Express.
 */
export const validarMovimientoController = async (req, res) => {
  try {
    const { cedula, tipoMovimiento, monto, nroFactura } = req.body;

    const resultadoValidacion = await movimientoUseCase.validarMovimientoPago({
      cedula,
      tipoMovimiento,
      monto,
      nroFactura,
    });

    res.status(200).json(resultadoValidacion);
  } catch (error) {
    // Si el error es una instancia de Error, es un error de negocio controlado.
    res.status(400).json({ message: error.message });
  }
};