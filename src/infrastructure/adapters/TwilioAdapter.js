import { sendOtpService, verifyOtpService } from "../../../application/services/twilioService.js";
import { TwilioPort } from "../../../domain/ports/TwilioPort.js";

export class TwilioAdapter extends TwilioPort {
  async enviarOTP(telefono) {
    return await sendOtpService(telefono);
  }

  async verificarOTP(telefono, codigo) {
    return await verifyOtpService(telefono, codigo);
  }
}
