import { getAllScoringUseCase } from "../../application/usecases/scoring/getAllScoringUseCase.js";
import { getScoringByIdUseCase } from "../../application/usecases/scoring/getScoringByIdUseCase.js";
import { getScoringByEstadoUseCase } from "../../application/usecases/scoring/getScoringByEstadoUseCase.js";
import { createScoringUseCase } from "../../application/usecases/scoring/createScoringUseCase.js";
import { updateScoringByIdUseCase } from "../../application/usecases/scoring/updateScoringByIdUseCase.js";

export async function getAllScoring(req, res) {
  try {
    const data = await getAllScoringUseCase();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getScoringById(req, res) {
  try {
    const data = await getScoringByIdUseCase(req.params.id);
    if (!data) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getScoringByEstado(req, res) {
  try {
    const data = await getScoringByEstadoUseCase("pendiente");
    if (data.length === 0) {
      return res.status(404).json({ message: "No hay registros pendientes" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createScoring(req, res) {
  try {
    await createScoringUseCase(req.body);
    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateScoringById(req, res) {
  try {
    const { id } = req.params;
    const { Estado } = req.body;
    await updateScoringByIdUseCase(id, Estado || "pendiente");
    res.status(200).json({ message: "Registro actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
