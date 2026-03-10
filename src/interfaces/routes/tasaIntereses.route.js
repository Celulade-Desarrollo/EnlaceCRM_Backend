import express from "express";
import { getAllTasaIntereses } from "../controllers/tasaIntereses.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

const tasaInteresesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: TasaIntereses
 *   description: Gestión de tasas efectivas anuales
 */

/**
 * @swagger
 * /api/tasaIntereses:
 *   get:
 *     summary: Obtener todos los registros de tasaIntereses
 *     tags: [TasaIntereses]
 *     responses:
 *       200:
 *         description: Lista de registros
 */
tasaInteresesRouter.get("/api/tasaIntereses", authMiddleware, getAllTasaIntereses);

export default tasaInteresesRouter;
