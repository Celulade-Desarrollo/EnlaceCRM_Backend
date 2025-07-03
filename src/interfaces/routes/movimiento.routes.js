import express from "express";
import { getMovimientosByCliente } from "../controllers/movimiento.Controller.js";

const movimientoRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movimientos
 *   description: Consulta de movimientos de crédito (pagos y abonos)
 */

/**
 * @swagger
 * /api/movimientos/{clienteId}:
 *   get:
 *     summary: Obtener los movimientos (pagos y abonos) de los últimos 3 meses de un cliente
 *     tags: [Movimientos]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de movimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IdMovimiento:
 *                     type: integer
 *                   IdUsuarioFinal:
 *                     type: integer
 *                   FechaMovimiento:
 *                     type: string
 *                     format: date-time
 *                   IdTipoMovimiento:
 *                     type: integer
 *                   IdEstadoMovimiento:
 *                     type: integer
 *                   Monto:
 *                     type: number
 *                   Descripcion:
 *                     type: string
 *                   FechaPagoProgramado:
 *                     type: string
 *                     format: date-time
 */
movimientoRouter.get("/api/movimientos/:clienteId", getMovimientosByCliente);

export default movimientoRouter;
