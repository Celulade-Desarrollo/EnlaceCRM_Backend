import axios from 'axios';
import ValidationError from '../../errors/Validation.error.js';

class EstadoCuentaAdapter {
  constructor() {
    this.apiUrl = 'https://api.alpina.com/estado-cuenta'; // URL por defecto
  }

  async obtenerEstadoCuenta(identificadorTendero) {
    identificadorTendero = identificadorTendero?.trim(); // ← limpieza aquí

    if (!identificadorTendero || typeof identificadorTendero !== 'string') {
      throw new ValidationError('identificadorTendero debe ser un string válido');
    }

    try {
      const response = await axios.get(this.apiUrl, {
        params: { identificadorTendero },
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': `Bearer ${this.apiKey}`  ← eliminado por ahora
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
  }


}

export { EstadoCuentaAdapter };

