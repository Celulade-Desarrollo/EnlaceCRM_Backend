import express from "express";
import { sendOTP, verifyOTP } from "../controllers/twilio.controller.js";
import { buscarUsuarioPorTelefono } from "../middleware/phone_middleware.js";

const twilioRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Twilio
 *   description: Endpoints para verificación OTP
 */

/**
 * @swagger
 * /api/twilio/send:
 *   post:
 *     summary: Enviar OTP usando Twilio
 *     tags: [Twilio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "3001234567"
 *     responses:
 *       200:
 *         description: OTP enviado
 */
twilioRouter.post("/api/twilio/send", buscarUsuarioPorTelefono, sendOTP);

/**
 * @swagger
 * /api/twilio/verify:
 *   post:
 *     summary: Verificar OTP recibido
 *     tags: [Twilio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "3001234567"
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verificado
 */
twilioRouter.post("/api/twilio/verify", verifyOTP);

export default twilioRouter;

