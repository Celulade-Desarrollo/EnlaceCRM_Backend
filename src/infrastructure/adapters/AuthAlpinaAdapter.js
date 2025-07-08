import axios from 'axios';
import {
  ALPINA_AUTH_URL,
  ALPINA_AUTH_USERNAME,
  ALPINA_AUTH_PASSWORD
} from '../../config/env.js';


import { logger } from '../../config/logger.js';

class AuthAlpinaAdapter {
  constructor() {
    this.authUrl = ALPINA_AUTH_URL;

    if (!ALPINA_AUTH_USERNAME || !ALPINA_AUTH_PASSWORD) {
      throw new Error('Credenciales de Alpina no definidas en variables de entorno');
    }
  }

  async obtenerToken() {
    try {
      const response = await axios.post(
        this.authUrl,
        {
          username: ALPINA_AUTH_USERNAME,
          password: ALPINA_AUTH_PASSWORD
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );

      if (!response.data || !response.data.token) {
        throw new Error('Token no encontrado en la respuesta de Alpina');
      }

      return response.data.token;

    } catch (error) {
      // Logging centralizado si está configurado
      if (logger) {
        logger.error('Error al obtener token JWT de Alpina', {
          error: error.message,
          stack: error.stack,
          authUrl: this.authUrl
        });
      } else {
        console.error('Error al obtener token JWT de Alpina:', error.message);
      }

      // Errores diferenciados
      if (error.code === 'ECONNABORTED') {
        throw new Error('Timeout al conectar con el servicio de autenticación de Alpina');
      }

      throw new Error('No se pudo obtener el token JWT de Alpina.');
    }
  }
}

export { AuthAlpinaAdapter };

