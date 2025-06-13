export class TwilioRequest {
  constructor({ telefono, codigo = null }) {
    this.telefono = telefono;
    this.codigo = codigo;
  }

  toString() {
    return `TwilioRequest: ${this.telefono} - ${this.codigo}`;
  }
}
