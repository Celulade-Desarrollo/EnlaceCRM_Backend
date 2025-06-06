export class TwilioService {
  /**
   * @param {TwilioPort} twilioPort
   */
  constructor(twilioPort) {
    this.twilioPort = twilioPort;
  }

  async enviarOTP(telefono) {
    return await this.twilioPort.enviarOTP(telefono);
  }

  async verificarOTP(telefono, codigo) {
    return await this.twilioPort.verificarOTP(telefono, codigo);
  }
}
