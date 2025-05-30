import express from "express";
import {
  getAllScoring,
  getScoringById,
  createScoring,
  getScoringByEstado,
  updateScoringById,
} from "../controller/enlaceScoring.controller.js";

const scoring = express.Router();

// GET: Todos los registros
scoring.get("/api/scoring", getAllScoring);

// GET: Por IdFlujoRegistro de enlace
scoring.get("/api/scoring/:id", getScoringById);

// GET: Por Estado "pendiente"
scoring.get("/api/scoring/estado/pendiente", getScoringByEstado);

// PUT para actualizar un registro, para el banco
scoring.put("/api/scoring/estado/update/:id", updateScoringById);

// POST: Crear nuevo registro
scoring.post("/api/scoring", createScoring);

export default scoring;
