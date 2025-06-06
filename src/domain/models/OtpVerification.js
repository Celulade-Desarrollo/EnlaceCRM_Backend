export class OtpVerification {
  constructor({ telefono, codigo }) {
    this.telefono = telefono;
    this.codigo = codigo;
  }
   verificar() {
    // Lógica para verificar si el código OTP es válido
    return true; // o false según la lógica de verificación
  }
}
