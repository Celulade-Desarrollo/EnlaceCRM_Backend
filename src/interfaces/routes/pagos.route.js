import express from "express";
import { confirmarPagoController } from "../controllers/pagos.controller.js";

const router = express.Router();

/**
 * @swagger
 * /pagos/confirmar:
 *   post:
 *     summary: Registra un pago confirmado para un tendero
 *     tags:
 *       - Pagos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificadorTendero:
 *                 type: integer
 *               monto:
 *                 type: number
 *               descripcion:
 *                 type: string
 *               fechaPagoProgramado:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Pago registrado correctamente
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */
// router.post("/confirmar", confirmarPagoController);
router.post("/api/pagos/confirmar", confirmarPagoController);

export default router;
