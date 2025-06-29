import axios from 'axios';
import { ALPINA_API_KEY, ESTADO_CUENTA_API_URL } from "../../config/env.js";

class EstadoCuentaAdapter {
  constructor() {
    this.apiUrl = ESTADO_CUENTA_API_URL || 'https://api.alpina.com/estado-cuenta';    
    this.apiKey = ALPINA_API_KEY;

    if (!this.apiKey) {
      throw new Error('ALPINA_API_KEY environment variable is required');
    } 
  }

  async obtenerEstadoCuenta(identificadorTendero) {
    if (!identificadorTendero || typeof identificadorTendero !== 'string') {
      throw new Error('identificadorTendero debe ser un string válido');
    }

    try {
      const response = await axios.get(this.apiUrl, {
        params: { identificadorTendero },
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al consultar Estado de Cuenta Alpina:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw new Error('No se pudo obtener el estado de cuenta.');
    }
  }}

export { EstadoCuentaAdapter };
