import { twilioService } from "../../infrastructure/services/twilio.service.js";

export async function sendOtpUseCase(telefono) {
  return await twilioService.sendOtp(telefono);
}
