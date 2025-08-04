/**
 * @class UsuarioFinal
 * @description Representa la entidad de un usuario final en el dominio de la aplicación.
 * Contiene la lógica y propiedades intrínsecas de un usuario.
 */
export class UsuarioFinal {
  /**
   * @param {object} data - Los datos para inicializar el usuario final.
   * @param {number} data.IdUsuarioFinal - El ID único del usuario.
   * @param {string} data.Cedula - La cédula del usuario.
   * @param {number} data.MontoMinimoPago - El monto mínimo de pago configurado.
   * @param {boolean} data.BloqueoMora - Indica si el usuario está bloqueado por mora.
   */
  constructor({ IdUsuarioFinal, Cedula, MontoMinimoPago, BloqueoMora }) {
    this.id = IdUsuarioFinal;
    this.cedula = Cedula;
    this.montoMinimoPago = parseFloat(MontoMinimoPago) || 0;
    this.estaBloqueadoPorMora = Boolean(BloqueoMora);
  }
}