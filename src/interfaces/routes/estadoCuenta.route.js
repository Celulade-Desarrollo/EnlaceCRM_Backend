import express from "express";
import { obtenerEstadoCuentaController } from "../controllers/estadoCuenta.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/pagos/estado-cuenta:
 *   get:
 *     summary: Consulta el estado de cuenta del tendero
 *     tags:
 *       - Pagos
 *     parameters:
 *       - in: query
 *         name: identificadorTendero
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del tendero (cédula o código interno)
 *     responses:
 *       200:
 *         description: Estado de cuenta del tendero
 *         content:
 *           application/json:
 *             example:
 *               deudaTotal: 150000
 *               siguienteAbono: "2025-07-10"
 *               cupoDisponible: 50000
 *               bloqueoPorMora: false
 *               proveedoresHabilitados: ["Proveedor A", "Proveedor B"]
 *       400:
 *         description: Parámetro faltante
 *       500:
 *         description: Error interno del servidor
 */

router.get("/api/pagos/estado-cuenta", obtenerEstadoCuentaController);

export default router;
