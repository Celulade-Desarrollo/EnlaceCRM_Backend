import express from "express";
import { createAbono } from "../controllers/abonos.controller.js";

const rutaAbonos = express.Router();

/**
 * @swagger
 * /api/abonos/upload:
 *   post:
 *     summary: Subir un archivo Excel/CSV de abonos
 *     tags: [Abonos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 description: Lista de abonos extraídos del Excel/CSV
 *                 items:
 *                   type: object
 *                   properties:
 *                     Cedula:
 *                       type: string
 *                       example: "123456789"
 *                     Id_transaccion:
 *                       type: string
 *                       example: "TX12345"
 *                     Monto_total:
 *                       type: number
 *                       example: 150000.50
 *                     Tipo_abono:
 *                       type: string
 *                       example: "Transferencia"
 *                     Fecha:
 *                       type: string
 *                       format: date
 *                       example: "2025-09-16"
 *                     Hora:
 *                       type: string
 *                       example: "10:30:00"
 *     responses:
 *       200:
 *         description: Archivo procesado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Archivo cargado exitosamente"
 *       400:
 *         description: Error en la validación del archivo o datos
 *       500:
 *         description: Error interno del servidor
 */
rutaAbonos.post('/api/abonos/upload', createAbono);

export default rutaAbonos;