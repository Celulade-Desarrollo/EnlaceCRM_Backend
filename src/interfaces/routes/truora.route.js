import express from "express";
const truora = express.Router();

// Controladores
import { truoraInfo } from "../controllers/truora.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

/**
 * @swagger
 * /api/truora:
 *   get:
 *     summary: Obtener información de validación Truora
 *     tags: [Truora]
 *     responses:
 *       200:
 *         description: Validación exitosa con Truora
 */
truora.get("/api/truora", authMiddleware, truoraInfo);

export default truora;