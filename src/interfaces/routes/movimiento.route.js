import { Router } from "express";
import { validarMovimientoController } from "../controllers/movimiento.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movimientos
 *   description: API para la gestión de movimientos
 */

/**
 * @swagger
 * /api/movimiento/validar:
 *   post:
 *     summary: Valida un movimiento de pago antes de procesarlo
 *     tags: [Movimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cedula:
 *                 type: string
 *                 description: Cédula del tendero que realiza el pago.
 *                 example: "12345678"
 *               tipoMovimiento:
 *                 type: integer
 *                 description: "Tipo de movimiento. Debe ser 1 para 'Pago'."
 *                 example: 1
 *               monto:
 *                 type: number
 *                 format: float
 *                 description: El monto que se desea pagar.
 *                 example: 150.50
 *               nroFactura:
 *                 type: string
 *                 description: El número de la factura a pagar.
 *                 example: "F-00123"
 *     responses:
 *       200:
 *         description: Movimiento válido. La solicitud es correcta y puede ser procesada.
 *       400:
 *         description: Error de validación o de negocio. La solicitud no puede ser procesada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El tendero se encuentra bloqueado por mora y no puede realizar pagos."
 */
router.post("/api/movimiento/validar", validarMovimientoController);

export default router;