import { twilioService } from "../../services/twilioServiceInstance.js";

export async function sendOtpUseCase(telefono) {
  return await twilioService.sendOtp(telefono);
}
