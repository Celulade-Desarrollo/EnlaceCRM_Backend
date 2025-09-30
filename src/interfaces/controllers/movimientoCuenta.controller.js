import { registrarMovimientoUseCase } from "../../application/usecases/pagos/registrarMovimientoUseCase.js";
import { getMovimientosUseCase } from "../../application/usecases/movimientos/getMovimientosRefactorUseCase.js";
import { listarMovimientosParaEnlace } from "../../application/usecases/movimientos/listarMovimientosParaEnlace.js";
import { calcularInteresesUseCase } from "../../application/usecases/movimientos/calcularInteresesUseCase.js";

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



export const getMovimientosByCliente = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const movimientos = await getMovimientosUseCase(clienteId)
    res.json(movimientos);
  } catch (error) {
    console.error("Error al obtener movimientos:", error.message);
    res.status(500).json({ error: "Error al obtener movimientos" });
  }
};


export const listarMovimientosParaEnlaceController = async (req, res) => {
  try {
    const movimientos = await listarMovimientosParaEnlace();
    res.json(movimientos);
  } catch (error) {
    console.error("Error al listar movimientos para Enlace:", error.message);
    res.status(500).json({ error: "Error al listar movimientos para Enlace" });
  }
}

export const calcularInteresesController = async (req, res) => {
  try {
    const { idMovimiento } = req.body;
    const { nuevoMonto } = req.body;
    if (!idMovimiento || !nuevoMonto) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios: idMovimiento y nuevoMonto" });
    } 
    const resultado = await calcularInteresesUseCase(idMovimiento, nuevoMonto);
    res.json(resultado);
  } catch (error) {
    console.error("Error al calcular intereses:", error.message);
    res.status(500).json({ error: "Error al calcular intereses" });
  } 
}