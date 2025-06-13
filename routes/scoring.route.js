import express from "express";
import {
  getAllScoring,
  getScoringById,
  createScoring,
  getScoringByEstado,
  updateScoringById,
} from "../controller/enlaceScoring.controller.js";

const scoring = express.Router();

/**
 * @swagger
 * /api/scoring:
 *   get:
 *     summary: Obtener todos los registros de scoring
 *     tags: [Scoring]
 *     responses:
 *       200:
 *         description: Lista de registros
 */
scoring.get("/api/scoring", getAllScoring);

/**
 * @swagger
 * /api/scoring/{id}:
 *   get:
 *     summary: Obtener scoring por ID de flujo
 *     tags: [Scoring]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del flujo de scoring
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
scoring.get("/api/scoring/:id", getScoringById);

/**
 * @swagger
 * /api/scoring/estado/pendiente:
 *   get:
 *     summary: Obtener registros con estado pendiente
 *     tags: [Scoring]
 *     responses:
 *       200:
 *         description: Lista de registros pendientes
 */
scoring.get("/api/scoring/estado/pendiente", getScoringByEstado);

/**
 * @swagger
 * /api/scoring/estado/update/{id}:
 *   put:
 *     summary: Actualizar scoring por ID para el banco
 *     tags: [Scoring]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del flujo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               estado: "aprobado"
 *     responses:
 *       200:
 *         description: Registro actualizado
 */
scoring.put("/api/scoring/estado/update/:id", updateScoringById);

/**
 * @swagger
 * /api/scoring:
 *   post:
 *     summary: Crear un nuevo registro de scoring
 *     tags: [Scoring]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               idFlujoRegistro: "123"
 *               resultado: "Aprobado"
 *     responses:
 *       201:
 *         description: Registro creado
 */
scoring.post("/api/scoring", createScoring);

export default scoring;


// import express from "express";
// import {
//   getAllScoring,
//   getScoringById,
//   createScoring,
//   getScoringByEstado,
//   updateScoringById,
// } from "../controller/enlaceScoring.controller.js";

// const scoring = express.Router();

// // GET: Todos los registros
// scoring.get("/api/scoring", getAllScoring);

// // GET: Por IdFlujoRegistro de enlace
// scoring.get("/api/scoring/:id", getScoringById);

// // GET: Por Estado "pendiente" bancow
// scoring.get("/api/scoring/estado/pendiente", getScoringByEstado);

// // PUT para actualizar un registro, para el banco
// scoring.put("/api/scoring/estado/update/:id", updateScoringById);

// // POST: Crear nuevo registro
// scoring.post("/api/scoring", createScoring);

// export default scoring;
