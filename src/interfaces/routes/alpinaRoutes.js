import express from "express";
import { obtenerFacturas } from "../controllers/alpinaController.js";

const router = express.Router();

/**
 * @swagger
 * /pagos/facturas-disponibles:
 *   get:
 *     summary: Consulta las facturas pendientes de Alpina para un tendero
 *     tags:
 *       - Alpina
 *     parameters:
 *       - in: query
 *         name: identificadorTendero
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador del tendero (cédula o código interno)
 *     responses:
 *       200:
 *         description: Lista de facturas pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idFactura:
 *                     type: string
 *                   fechaEmision:
 *                     type: string
 *                   monto:
 *                     type: number
 *                   estado:
 *                     type: string
 *                   fechaVencimiento:
 *                     type: string
 *       400:
 *         description: Error de parámetros
 *       500:
 *         description: Error al consultar Alpina
 */
router.get("/pagos/facturas-disponibles", obtenerFacturas);

export default router;
