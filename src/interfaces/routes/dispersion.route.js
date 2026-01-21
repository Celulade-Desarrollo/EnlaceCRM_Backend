import express from "express";
import { listarDispersionController } from "../controllers/dispersion.controller.js";
import { updateEstadoById } from "../controllers/dispersion.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

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

router.get("/api/listar/dispersion", authMiddleware, listarDispersionController);
/**
 * @swagger
 * /api/editar-dispersion/estadoBanco/{id}:
 *   put:
 *     summary: Actualizar estado bancario de una dispersión
 *     description: Actualiza el estado bancario de una dispersión específica por su ID
 *     tags:
 *       - Dispersion
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la dispersión
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: boolean
 *                 example: true
 *
 *     responses:
 *       200:
 *         description: Estado bancario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Estado bancario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Dispersión no encontrada
 *       500:
 *         description: Error del servidor
 */

router.put("/api/editar-dispersion/estadoBanco/:id", authMiddleware, updateEstadoById);

export default router;