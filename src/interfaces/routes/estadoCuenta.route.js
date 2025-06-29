import express from "express";
import { obtenerEstadoCuentaController } from "../controllers/estadoCuenta.controller.js";

const router = express.Router();

/**
 * @swagger
 * /pagos/estado-cuenta:
 *   get:
 *     summary: Consulta el estado de cuenta del tendero con Alpina
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
 *         description: Estado de cuenta del tendero
 *       400:
 *         description: Parámetro faltante
 *       500:
 *         description: Error al consultar Alpina
 */
router.get("/pagos/estado-cuenta", obtenerEstadoCuentaController);

export default router;

