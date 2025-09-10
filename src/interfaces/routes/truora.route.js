import express from "express";
const truora = express.Router();

// Controladores
import { setStatusProcess } from "../controllers/truora.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

/**
 * @swagger
 * /api/truora/{process_id}:
 *   get:
 *     summary: Obtener información de validación Truora por ID de proceso
 *     tags: 
 *       - Truora
 *     parameters:
 *       - in: path
 *         name: process_id
 *         required: true
 *         description: ID del proceso de validación de Truora
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Validación exitosa con Truora
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la validación
 *                 document_number:
 *                   type: string
 *                   description: Número de documento validado
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
truora.get("/api/truora/:process_id", setStatusProcess);

export default truora;