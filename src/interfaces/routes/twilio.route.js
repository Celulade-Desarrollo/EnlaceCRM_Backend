// src/interfaces/routes/twilio.route.js

import express from "express";
import { sendOTP, verifyOTP } from "../controllers/twilio.controller.js";
import { buscarUsuarioPorTelefono } from "../middleware/phone_middleware.js";

const twilioRouter = express.Router();

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
 *             example:
 *               telefono: "3001234567"
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
 *             example:
 *               telefono: "3001234567"
 *               codigo: "123456"
 *     responses:
 *       200:
 *         description: OTP verificado
 */
twilioRouter.post("/api/twilio/verify", verifyOTP);

export default twilioRouter;
