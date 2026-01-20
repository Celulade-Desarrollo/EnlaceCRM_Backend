/**
   * @param {Object} data - Los datos para inicializar la tesorería.
   * @param {number} [data.id] - El ID único de la tesorería (opcional, se genera en la DB).
   * @param {Date} data.fecha - La fecha de la tesorería.
   * @param {number} data.recaudo - El monto de recaudo.
   * @param {string} data.dispersion - Empresa a la cual se dirige la dispersión.
   * @param {boolean} [data.tesoreria_status=false] - El estado de la tesorería.
   * @param {boolean} [data.banco_status=false] - El estado del banco.
   */
export class Tesoreria {
  constructor({
    id,
    fecha,
    recaudo,
    dispersion,
    // Estos valores estan por defecto en false para evitar manejar nulls y valores por defecto con el sql 
    tesoreria_status = false,
    banco_status = false

  }){
    this.id = id;
    this.fecha = fecha;
    this.recaudo = recaudo;
    this.dispersion = dispersion;
    this.tesoreria_status = tesoreria_status;
    this.banco_status = banco_status;
  }
}