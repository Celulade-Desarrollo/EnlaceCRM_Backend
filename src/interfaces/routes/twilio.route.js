import express from "express";
import { sendOTP, verifyOTP } from "../controllers/twilio.controller.js";
import { buscarUsuarioPorTelefono } from "../middleware/cedula_middleware.js";
import { authMiddleware } from "../middleware/token-middleware.js";

const twilioRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Twilio
 *     description: Endpoints para verificación OTP con Twilio
 */

/**
 * @swagger
 * /api/twilio/send:
 *   post:
 *     summary: Enviar código OTP al número de teléfono
 *     tags: [Twilio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - telefono
 *             properties:
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono del usuario
 *                 example: "3001234567"
 *     responses:
 *       200:
 *         description: OTP enviado exitosamente
 *       400:
 *         description: Número no encontrado o inválido
 *       500:
 *         description: Error interno del servidor
 */
twilioRouter.post("/api/twilio/send", authMiddleware, buscarUsuarioPorTelefono, sendOTP);

/**
 * @swagger
 * /api/twilio/verify:
 *   post:
 *     summary: Verificar el código OTP ingresado
 *     tags: [Twilio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - telefono
 *               - codigo
 *             properties:
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono al que se envió el OTP
 *                 example: "3001234567"
 *               codigo:
 *                 type: string
 *                 description: Código OTP recibido por el usuario
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verificado correctamente
 *       400:
 *         description: Código inválido o expirado
 *       500:
 *         description: Error interno del servidor
 */
twilioRouter.post("/api/twilio/verify", authMiddleware, verifyOTP);

export default twilioRouter;
