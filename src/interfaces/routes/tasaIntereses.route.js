import express from "express";
import { getAllTasaIntereses, updateTasaIntereses } from "../controllers/tasaIntereses.controller.js";
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

/**
 * @swagger
 * /api/tasaIntereses/{id}:
 *   put:
 *     summary: Editar tasa de intereses por ID
 *     description: Actualiza la tasa de intereses de un registro por su ID. Se pueden actualizar uno o ambos campos.
 *     tags:
 *       - TasaIntereses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro al que se le actualizará la tasa
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorFactorSeguro:
 *                 type: number
 *                 example: 0.00083
 *               tasaEfectivaAnual:
 *                 type: number
 *                 example: 0.49
 *     responses:
 *       200:
 *         description: Tasa de intereses actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tasa de intereses actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */

tasaInteresesRouter.get("/api/tasaIntereses", authMiddleware, getAllTasaIntereses);
tasaInteresesRouter.put("/api/tasaIntereses/:id", authMiddleware, updateTasaIntereses);

export default tasaInteresesRouter;
