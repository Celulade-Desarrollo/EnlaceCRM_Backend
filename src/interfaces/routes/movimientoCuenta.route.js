import express from "express";
import { registrarMovimientoController } from "../controllers/movimientoCuenta.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/movimientos:
 *   post:
 *     summary: Registra un movimiento financiero (pago, abono, ajuste, interés o comisión) y actualiza el saldo del tendero
 *     tags:
 *       - Movimientos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identificadorTendero
 *               - monto
 *               - tipoMovimiento
 *             properties:
 *               identificadorTendero:
 *                 type: string
 *               monto:
 *                 type: number
 *                 format: float
 *                 example: 100000
 *               tipoMovimiento:
 *                 type: integer
 *                 enum: [1, 2, 3, 4, 5]
 *                 description: >
 *                   Tipo de movimiento:
 *                   - 1 = PAGO (Débito resta del saldo)
 *                   - 2 = ABONO (Crédito suma al saldo)
 *                   - 3 = AJUSTE
 *                   - 4 = INTERES
 *                   - 5 = COMISION
 *               descripcion:
 *                 type: string
 *               fechaPagoProgramado:
 *                 type: string
 *                 format: date
 *               idMedioPago:
 *                 type: integer
 *               nroFacturaAlpina:
 *                 type: string
 *               telefonoTransportista:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movimiento registrado correctamente
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/api/movimientos", authMiddleware, registrarMovimientoController);

export default router;
