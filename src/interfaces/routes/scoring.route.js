import express from "express";
import {
  getAllScoring,
  getScoringById,
  createScoring,
  getScoringByEstado,
  updateScoringById,
} from "../controllers/enlaceScoring.controller.js";

const scoringRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Scoring
 *   description: Gestión del scoring de clientes
 */

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
scoringRouter.get("/api/scoring", getAllScoring);

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
scoringRouter.get("/api/scoring/:id", getScoringById);

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
scoringRouter.get("/api/scoring/estado/pendiente", getScoringByEstado);

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
scoringRouter.put("/api/scoring/estado/update/:id", updateScoringById);

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
scoringRouter.post("/api/scoring", createScoring);

export default scoringRouter;
