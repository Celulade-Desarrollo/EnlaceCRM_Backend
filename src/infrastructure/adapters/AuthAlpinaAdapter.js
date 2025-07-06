// src/infrastructure/adapters/AuthAlpinaAdapter.js
import axios from 'axios';
import { ALPINA_AUTH_URL, ALPINA_AUTH_USERNAME, ALPINA_AUTH_PASSWORD } from '../../config/env.js';

class AuthAlpinaAdapter {
  constructor() {
    this.authUrl = ALPINA_AUTH_URL;

    if (!ALPINA_AUTH_USERNAME || !ALPINA_AUTH_PASSWORD) {
      throw new Error('Credenciales de Alpina no definidas en variables de entorno');
    }
  }

  async obtenerToken() {
    try {
      const response = await axios.post(this.authUrl, {
        username: ALPINA_AUTH_USERNAME,
        password: ALPINA_AUTH_PASSWORD
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      return response.data.token;
    } catch (error) {
      console.error('Error al obtener token JWT de Alpina:', error.message);
      throw new Error('No se pudo obtener el token JWT de Alpina.');
    }
  }
}

export { AuthAlpinaAdapter };
