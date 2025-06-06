import { twilioService } from "../../infrastructure/services/twilio.service.js";

export async function verifyOtpUseCase(telefono, codigo) {
  return await twilioService.verifyOtp(telefono, codigo);
}
