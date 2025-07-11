export class AlpinaDatosPort {
  /**
   * Método que debe implementarse para obtener los datos del cliente y agente comercial
   * desde la base de datos a partir del identificador del tendero.
   * @param {string} identificadorTendero
   * @returns {Promise<{ nbCliente: string, nbAgenteComercial: string }>}
   */
  async obtenerDatosClienteYAgente(identificadorTendero) {
    throw new Error('Método obtenerDatosClienteYAgente() no implementado');
  }
}

