import {obtenerTodosLogs} from "../controllers/Logs.controller.js";
import { Router } from "express";
const LogsRouter = Router()


/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Obtener todos los logs del sistema
 *     tags: 
 *       - Logs
 *     responses:
 *       200:
 *         description: Lista de logs obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
LogsRouter.get('/api/logs', obtenerTodosLogs)

export { LogsRouter }
