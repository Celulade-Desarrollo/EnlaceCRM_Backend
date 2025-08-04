import axios from 'axios';
import { ALPINA_FACTURAS_API_URL } from "../../config/env.js";
import { logger } from "../../config/logger.js";

class AlpinaAdapter {
  constructor() {
    this.apiUrl = ALPINA_FACTURAS_API_URL;

    if (!this.apiUrl) {
      throw new Error('Falta la URL de la API de Alpina en las variables de entorno');
    }
  }

    async obtenerFacturasPendientes(token, nbCliente, nbAgenteComercial) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const body = {
      nbCliente: String(nbCliente),
      nbAgenteComercial: String(nbAgenteComercial)
    };

    logger.info('[AlpinaAdapter] Obteniendo facturas pendientes', {
      nbCliente,
      nbAgenteComercial
    });


    logger.info('[AlpinaAdapter] Enviando solicitud a API de Alpina', {
      url: this.apiUrl,
      headers,
      body
    });

    try {
      const response = await axios.post(this.apiUrl, body, { headers });

      logger.info('[AlpinaAdapter] Respuesta recibida de Alpina', {
        status: response.status,
        cantidadFacturas: response.data?.data?.length ?? 0
      });

      return response.data?.data || [];
    } catch (error) {
      logger.error('[AlpinaAdapter] Error al consultar Alpina', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });

      throw new Error('No se pudo obtener la información de facturas pendientes.');
    }
  }

}

export { AlpinaAdapter };

// import axios from 'axios';
// import {
//   ALPINA_CLIENTE_ID,
//   ALPINA_AGENTE_COMERCIAL,
//   ALPINA_FACTURAS_API_URL
// } from "../../config/env.js";

// class AlpinaAdapter {
//   constructor() {
//     this.apiUrl = ALPINA_FACTURAS_API_URL;
//     this.clienteId = ALPINA_CLIENTE_ID;
//     this.agenteComercial = ALPINA_AGENTE_COMERCIAL;

//     if (!this.apiUrl || !this.clienteId || !this.agenteComercial) {
//       throw new Error('Faltan variables ALPINA_* en el archivo .env');
//     }
//   }

//   async obtenerFacturasPendientes(token) {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     };

//     const body = {
//       nbCliente: ALPINA_CLIENTE_ID,
//       nbAgenteComercial: ALPINA_AGENTE_COMERCIAL
//     };

//     // Logs temporales para depuración
//     console.log('[AlpinaAdapter] URL:', this.apiUrl);
//     console.log('[AlpinaAdapter] Headers:', headers);
//     console.log('[AlpinaAdapter] Body:', body);

//     try {
//       const response = await axios.post(this.apiUrl, body, { headers });
//       return response.data?.data || [];
//     } catch (error) {
//       console.error('Error al consultar Alpina:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data
//       });
//       throw new Error('No se pudo obtener la información de facturas pendientes.');
//     }
//   }
// }

// export { AlpinaAdapter };
