// src/application/services/twilioService.js

import twilio from "twilio";

// Usa variables de entorno para mayor seguridad
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

export async function sendOtpService(telefono) {
  try {
    await client.verify.v2.services(serviceSid).verifications.create({
      to: `+57${telefono}`,
      channel: "sms",
    });
    return "OTP enviado exitosamente";
  } catch (error) {
    throw new Error("Error enviando OTP: " + error.message);
  }
}

export async function verifyOtpService(telefono, codigo) {
  try {
    const verification_check = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: `+57${telefono}`,
        code: codigo,
      });

    return verification_check.status === "approved";
  } catch (error) {
    throw new Error("Error verificando OTP: " + error.message);
  }
}
