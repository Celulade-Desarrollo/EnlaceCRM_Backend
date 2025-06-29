import axios from 'axios';
import { ALPINA_API_KEY, ALPINA_FACTURAS_API_URL } from "../../config/env.js";
class AlpinaAdapter {
   constructor() {
     this.apiUrl = ALPINA_FACTURAS_API_URL || 'https://api.alpina.com/estado-cuenta';    
     this.apiKey = ALPINA_API_KEY;
 
     if (!this.apiKey) {
       throw new Error('ALPINA_API_KEY environment variable is required');
     } 
   }

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
