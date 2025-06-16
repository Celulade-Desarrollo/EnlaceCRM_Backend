import { getAllFlujoRegistro } from "../../application/usecases/flujoRegistro/getAllFlujoRegistroUseCase.js";
import { getFlujoRegistroById } from "../../application/usecases/flujoRegistro/getFlujoRegistroByIdUseCase.js";
import { getFlujoRegistroByAlpina } from "../../application/usecases/flujoRegistro/getFlujoRegistroByAlpinaUseCase.js";
import { getFlujoRegistroByNumeroCelular } from "../../application/usecases/flujoRegistro/getFlujoRegistroByNumeroCelularUseCase.js";
import { getFlujoRegistroByEstado } from "../../application/usecases/flujoRegistro/getFlujoRegistroByEstadoUseCase.js";
import { createFlujoRegistroUseCase } from "../../application/usecases/flujoRegistro/createFlujoRegistroUseCase.js";
import { deleteFlujoRegistroUseCase } from "../../application/usecases/flujoRegistro/DeleteFlujoRegistroUseCase.js";
import { updateEstadoFlujoRegistro } from "../../application/usecases/flujoRegistro/updateEstadoFlujoRegistroUseCase.js";

export async function getAll(req, res) {
  try {
    const data = await getAllFlujoRegistro();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getById(req, res) {
  try {
    const data = await getFlujoRegistroById(req.params.id);
    if (!data) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getByAlpina(req, res) {
  try {
    const data = await getFlujoRegistroByAlpina(req.params.alpinaId);
    if (!data) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getBynumber(req, res) {
  try {
    const data = await getFlujoRegistroByNumeroCelular(req.params.Numero_Celular);
    if (!data) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getByEstado(req, res) {
  try {
    const data = await getFlujoRegistroByEstado("pendiente");
    if (data.length === 0) {
      return res.status(404).json({ message: "No hay registros pendientes" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createRegistro(req, res) {
  try {
    const result = await createFlujoRegistroUseCase(req.body);
    res.status(201).json({ message: result.mensaje });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteById(req, res) {
  try {
    await deleteFlujoRegistroUseCase(req.params.id);
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateEstadoById(req, res) {
  try {
    const { id } = req.params;
    const { Estado } = req.body;
    await updateEstadoFlujoRegistro(id, Estado || "pendiente");
    res.status(200).json({ message: "Registro actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
