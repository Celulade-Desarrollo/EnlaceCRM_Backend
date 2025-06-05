import { getAllFlujoRegistro } from "../../application/usecases/getAllFlujoRegistro.js";
import { getFlujoRegistroById } from "../../application/usecases/getFlujoRegistroById.js";
import { getFlujoRegistroByAlpina } from "../../application/usecases/getFlujoRegistroByAlpina.js";
import { getFlujoRegistroByNumber } from "../../application/usecases/getFlujoRegistroByNumber.js";
import { getFlujoRegistroByEstado } from "../../application/usecases/getFlujoRegistroByEstado.js";
import { createFlujoRegistro } from "../../application/usecases/createFlujoRegistro.js";
import { deleteFlujoRegistroById } from "../../application/usecases/deleteFlujoRegistroById.js";
import { updateEstadoFlujoRegistroById } from "../../application/usecases/updateEstadoFlujoRegistroById.js";

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
    const data = await getFlujoRegistroByNumber(req.params.Numero_Celular);
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
    const result = await createFlujoRegistro(req.body);
    res.status(201).json({ message: result.mensaje });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteById(req, res) {
  try {
    await deleteFlujoRegistroById(req.params.id);
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateEstadoById(req, res) {
  try {
    const { id } = req.params;
    const { Estado } = req.body;
    await updateEstadoFlujoRegistroById(id, Estado || "pendiente");
    res.status(200).json({ message: "Registro actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
