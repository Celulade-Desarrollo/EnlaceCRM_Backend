import express from "express";
import { obtenerFacturas } from "../controllers/alpinaController.js";

const router = express.Router();

/**
 * @swagger
 * /pagos/facturas-pendientes:
 *   get:
 *     summary: Consulta las facturas pendientes del tendero con Alpina
 *     tags:
 *       - Alpina
 *     parameters:
 *       - in: query
 *         name: identificadorTendero
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del tendero (cédula o código interno)
 *     responses:
 *       200:
 *         description: Lista de facturas pendientes
 *         content:
 *           application/json:
 *             example:
 *               - idFactura: "123456"
 *                 fechaEmision: "2024-12-15"
 *                 monto: 152000
 *                 estado: "Pendiente"
 *                 fechaVencimiento: "2025-01-15"
 *       400:
 *         description: Error de parámetros
 *       500:
 *         description: Error al consultar Alpina
 */

router.get("/pagos/facturas-disponibles", obtenerFacturas);

export default router;
