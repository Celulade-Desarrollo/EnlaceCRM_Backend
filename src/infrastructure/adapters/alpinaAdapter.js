import axios from 'axios';

class AlpinaAdapter {
  constructor() {
    this.apiUrl = process.env.ALPINA_API_URL || 'https://api.alpina.com/facturas-pendientes';
    this.apiKey = process.env.ALPINA_API_KEY;
    if (!this.apiKey) {
      throw new Error('ALPINA_API_KEY environment variable is required');
    }  }

  async obtenerFacturasPendientes(identificadorTendero) {
    try {
      const response = await axios.get(this.apiUrl, {
        params: { identificadorTendero },
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al consultar Alpina:', error.message);
      throw new Error('No se pudo obtener la información de facturas pendientes.');
    }
  }
}

//module.exports = { AlpinaAdapter };

export { AlpinaAdapter }; 
