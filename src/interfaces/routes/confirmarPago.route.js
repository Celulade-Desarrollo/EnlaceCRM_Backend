import express from "express";
import { confirmarPagoController } from "../controllers/confirmarPago.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/pagos/confirmar:
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
 *             required:
 *               - identificadorTendero
 *               - monto
 *             properties:
 *               identificadorTendero:
 *                 type: string
 *                 description: Identificador del tendero (cédula o ID interno)
 *               monto:
 *                 type: number
 *                 description: Monto a pagar
 *               descripcion:
 *                 type: string
 *                 description: Descripción del pago
 *               fechaPagoProgramado:
 *                 type: string
 *                 format: date
 *                 description: Fecha programada del pago
 *     responses:
 *       201:
 *         description: Pago registrado correctamente
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/api/pagos/confirmar", confirmarPagoController);

export default router;

