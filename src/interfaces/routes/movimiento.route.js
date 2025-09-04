import { Router } from "express";
import { validarMovimiento, crearMovimientoPago } from "../controllers/movimiento.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movimientos
 *   description: Endpoints para la gestión de movimientos y pagos.
 */

/**
 * @swagger
 * /api/movimiento/validar:
 *   post:
 *     summary: Valida la información de un pago antes de procesarlo.
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
 *                 description: Cédula del usuario final.
 *                 example: "12345678"
 *               nrosFacturaAlpina:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Arreglo con los números de las facturas a validar.
 *                 example: ["F001", "F002"]
 *     responses:
 *       '200':
 *         description: Validación exitosa. Devuelve el monto recomendado y el mínimo de pago.
 *       '400':
 *         description: Error de validación de negocio o datos de entrada incorrectos.
 *       '500':
 *         description: Error interno del servidor.
 */
router.post("/validar", validarMovimiento);

/**
 * @swagger
 * /api/movimiento:
 *   post:
 *     summary: Crea un nuevo movimiento de pago y asocia las facturas correspondientes.
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
 *                 example: "12345678"
 *               monto:
 *                 type: number
 *                 example: 250000.00
 *               idMedioPago:
 *                 type: integer
 *                 example: 1
 *               descripcion:
 *                 type: string
 *                 example: "Abono a facturas de Enero"
 *               facturasSeleccionadas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nroFacturaAlpina:
 *                       type: string
 *                       example: "F001"
 *                     montoFacturaAlpina:
 *                       type: number
 *                       example: 250000.00
 *     responses:
 *       '201':
 *         description: Movimiento creado exitosamente.
 *       '400':
 *         description: Error de validación de negocio o datos de entrada incorrectos.
 *       '500':
 *         description: Error interno del servidor.
 */
router.post("/", authMiddleware, crearMovimientoPago);
export default router;
