import express from "express";
import { updateCupoById } from "../controllers/editarCupo.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/editar-cupo/{id}:
 *   put:
 *     summary: Editar cupo por ID
 *     description: Actualiza el cupo de un usuario en el sistema por su ID
 *     tags:
 *       - Cupo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro al que se le actualizará el cupo
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cupo:
 *                 type: string
 *                 example: "5000000"
 *     responses:
 *       200:
 *         description: Cupo actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cupo actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */

router.put("/api/editar-cupo/:id", authMiddleware, updateCupoById);

export default router;