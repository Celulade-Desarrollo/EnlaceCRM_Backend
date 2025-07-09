import express from "express";
import { obtenerFacturas } from "../controllers/alpina.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/pagos/facturas-pendientes:
 *   get:
 *     summary: Consulta todas las facturas pendientes con Alpina
 *     tags:
 *       - Alpina
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
 *       500:
 *         description: Error al consultar Alpina
 */
router.get("/api/pagos/facturas-pendientes", obtenerFacturas);

export default router;
