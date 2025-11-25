import { registrarMovimientoUseCase } from "../../application/usecases/pagos/registrarMovimientoUseCase.js";
import { getMovimientosUseCase } from "../../application/usecases/movimientos/getMovimientosRefactorUseCase.js";
import { listarMovimientosParaEnlace } from "../../application/usecases/movimientos/listarMovimientosParaEnlace.js";
import { calcularInteresesUseCase } from "../../application/usecases/movimientos/calcularInteresesUseCase.js";
import {registrarMovimientoTipoDosUseCase} from "../../application/usecases/pagos/registrarMovimientoTipoDosUseCase.js"

import ValidationError from "../../errors/Validation.error.js";
import { estadoCuentaRepository } from "../../infrastructure/repositories/estadoCuenta.repository.js";
import { consultarRecaudoTransportistaUseCase } from "../../application/usecases/transportista/consultarRecaudoTransportistaUseCase.js";

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

export const listarRecaudoParaTransportistaController = async (req, res) => {
  try {
    const {numTransportista} = req.params;

    const recaudo = await consultarRecaudoTransportistaUseCase(numTransportista);
    res.json(recaudo);
  } catch (error) {
    console.error("Error al listar recaudo para transportista:", error.message);
    res.status(500).json({ error: "Error al listar recaudo" });
  }
}

export const calcularInteresesController = async (req, res) => {
  try {
    const { IdMovimiento } = req.params;
    const { nuevoMonto } = req.body;
    if (!IdMovimiento || !nuevoMonto) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios: nroFacturaAlpina y nuevoMonto" });
    } 
  
    const resultado = await calcularInteresesUseCase(parseInt(IdMovimiento), nuevoMonto);
    res.json(resultado);
  } catch (error) {
    console.error("Error al calcular intereses:", error.message);
    res.status(500).json({ error: "Error al calcular intereses" });
  } 
}

export const actualizarAbonoMovimiento = async (req, res) => {
  try {
    const { IdMovimiento } = req.params;
    const { nuevoMonto } = req.body;
    if (!IdMovimiento || !nuevoMonto) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios: nroFacturaAlpina y nuevoMonto" });
    } 

    const resultado = await registrarMovimientoTipoDosUseCase((IdMovimiento), nuevoMonto);
    res.json(resultado);
  } catch (error) {
    console.error("Error al actualizar el abono:", error.message);
    res.status(500).json({ error: "Error al calcular intereses" });
  } 
}

export const actualizarTelefonoTransportistaController = async (req, res) => {
  try {
    const { identificadorTendero, telefonoTransportista } = req.body;

    console.log("📞 Actualizando teléfono - Body recibido:", req.body);

    if (!identificadorTendero || !telefonoTransportista) {
      return res.status(400).json({
        success: false,
        error: "Faltan datos requeridos: identificadorTendero y telefonoTransportista"
      });
    }

    const resultado = await estadoCuentaRepository.actualizarTelefonoTransportista(
      identificadorTendero,
      telefonoTransportista
    );

    console.log("Teléfono actualizado en BD:", resultado);

    res.json({
      success: true,
      mensaje: resultado.mensaje,
      rowsAffected: resultado.rowsAffected
    });
  } catch (error) {
    console.error("Error al actualizar teléfono:", error.message);

    if (error.message.includes("Usuario no encontrado")) {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al actualizar el teléfono del transportista"
    });
  }
};