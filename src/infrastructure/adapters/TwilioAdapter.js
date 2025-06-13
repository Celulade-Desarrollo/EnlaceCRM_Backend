import twilio from "twilio";
import { TwilioPort } from "../../domain/ports/TwilioPort.js";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

export class TwilioAdapter extends TwilioPort {
  async enviarOTP(telefono) {
    try {
      const result = await client.verify.v2.services(serviceSid).verifications.create({
        to: `+57${telefono}`,
        channel: "sms",
      });
      return result.status;
    } catch (error) {
      throw new Error("Error enviando OTP: " + error.message);
    }
  }

  async verificarOTP(telefono, codigo) {
    try {
      const verification = await client.verify.v2.services(serviceSid).verificationChecks.create({
        to: `+57${telefono}`,
        code: codigo,
      });
      return verification.status === "approved";
    } catch (error) {
      throw new Error("Error verificando OTP: " + error.message);
    }
  }
}
