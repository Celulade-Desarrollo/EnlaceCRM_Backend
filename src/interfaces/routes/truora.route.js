import express from "express";
const truora = express.Router();

// Controladores
import { truoraInfo } from "../controllers/truora.controller.js";

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
truora.get("/api/truora", truoraInfo);

export default truora;