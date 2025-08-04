import express from "express";
import { obtenerFacturas } from "../controllers/alpina.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/pagos/facturas-pendientes:
 *   post:
 *     summary: Consulta todas las facturas pendientes con Alpina para un tendero
 *     tags:
 *       - Alpina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificadorTendero:
 *                 type: string
 *                 description: Cédula del tendero
 *                 example: "1001188660"
 *     responses:
 *       200:
 *         description: Lista de facturas pendientes
 *         content:
 *           application/json:
 *             example:
 *               - clienteId: "8100005233"
 *                 documento: "7724996"
 *                 factura: "3381"
 *                 valor: 58040
 *       400:
 *         description: Petición inválida (ej. identificador faltante)
 *       500:
 *         description: Error interno del servidor
 */

// router.post("/api/pagos/facturas-pendientes", obtenerFacturas);
// router.get("/api/pagos/facturas-pendientes", authMiddleware, obtenerFacturas);

router.post("/api/pagos/facturas-pendientes", authMiddleware, obtenerFacturas);
export default router;
