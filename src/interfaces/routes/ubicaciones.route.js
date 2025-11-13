import express from "express";
import { procesarUbicacionesController, obtenerUbicacionesController } from "../controllers/ubicaciones.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/mapa/procesar:
 *   get:
 *     summary: Procesa el PDF de ubicaciones y genera coordenadas
 *     tags:
 *       - Mapa
 *     responses:
 *       200:
 *         description: Procesamiento exitoso
 *       500:
 *         description: Error al procesar ubicaciones
 */
router.get("/api/mapa/procesar", authMiddleware, procesarUbicacionesController);

/**
 * @swagger
 * /api/mapa/ubicaciones:
 *   get:
 *     summary: Retorna todas las ubicaciones procesadas con coordenadas
 *     tags:
 *       - Mapa
 *     responses:
 *       200:
 *         description: Lista de ubicaciones
 */
router.get("/api/mapa/ubicaciones", authMiddleware, obtenerUbicacionesController);

export default router;