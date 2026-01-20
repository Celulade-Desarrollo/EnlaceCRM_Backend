import express from "express";
import { listarDispersionController } from "../controllers/dispersion.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/listar/dispersion:
 *   get:
 *     summary: Listar dispersión
 *     description: Obtiene la lista de dispersiones registradas
 *     tags:
 *       - Dispersion
 *     responses:
 *       200:
 *         description: Lista de dispersiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Dispersion ejemplo
 *       500:
 *         description: Error del servidor
 */

router.get("/api/listar/dispersion", listarDispersionController);

export default router;