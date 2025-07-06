import axios from 'axios';
import {
  ALPINA_CLIENTE_ID,
  ALPINA_AGENTE_COMERCIAL
} from "../../config/env.js";

class AlpinaAdapter {
  constructor() {
    this.apiUrl = 'https://qa-client-gateway-general.amovil.com.co:42281/historical/bancoW';

    if (!ALPINA_CLIENTE_ID || !ALPINA_AGENTE_COMERCIAL) {
      throw new Error('Faltan ALPINA_CLIENTE_ID o ALPINA_AGENTE_COMERCIAL en el entorno');
    }
  }

  async obtenerFacturasPendientes(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const body = {
      nbCliente: ALPINA_CLIENTE_ID,
      nbAgenteComercial: ALPINA_AGENTE_COMERCIAL
    };

    // Logs temporales para depuración
    console.log('[AlpinaAdapter] URL:', this.apiUrl);
    console.log('[AlpinaAdapter] Headers:', headers);
    console.log('[AlpinaAdapter] Body:', body);

    try {
      const response = await axios.post(this.apiUrl, body, { headers });
      return response.data?.data || [];
    } catch (error) {
      console.error('Error al consultar Alpina:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw new Error('No se pudo obtener la información de facturas pendientes.');
    }
  }
}

export { AlpinaAdapter };
