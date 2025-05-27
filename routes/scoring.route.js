import express from "express";
import {
  getAllScoring,
  getScoringById,
  createScoring,
} from "../controller/enlaceScoring.controller.js";

const scoring = express.Router();

// GET: Todos los registros
scoring.get("/api/scoring", getAllScoring);

// GET: Por IdFlujoRegistro de enlace
scoring.get("/api/scoring/:id", getScoringById);

// POST: Crear nuevo registro
scoring.post("/api/scoring", createScoring);

export default scoring;
