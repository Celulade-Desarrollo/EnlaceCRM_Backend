// src/interfaces/controllers/twilio.controller.js

import { sendOtpService, verifyOtpService } from "../../application/services/twilioService.js";

export async function sendOTP(req, res) {
  const { telefono } = req.body;
  try {
    const response = await sendOtpService(telefono);
    res.status(200).json({ message: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function verifyOTP(req, res) {
  const { telefono, codigo } = req.body;
  try {
    const verified = await verifyOtpService(telefono, codigo);
    if (!verified) {
      return res.status(400).json({ error: "Código inválido o expirado" });
    }
    res.status(200).json({ message: "OTP verificado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
