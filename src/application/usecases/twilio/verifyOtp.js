import { twilioService } from "../../services/twilioServiceInstance.js";

export async function verifyOtpUseCase(telefono, codigo) {
  return await twilioService.verifyOtp(telefono, codigo);
}
