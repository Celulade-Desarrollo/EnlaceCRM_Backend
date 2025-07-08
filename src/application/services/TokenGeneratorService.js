// src/application/services/TokenGeneratorService.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto'; // Necesario para jwtid

dotenv.config();

export class TokenGeneratorService {
  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido en las variables de entorno.");
    }
    this.secret = process.env.JWT_SECRET;
  }

  /**
   * Genera un nuevo token JWT.
   * @param {object} payload - El objeto de datos a incluir en el token.
   * @param {string} expiresIn - Tiempo de expiración (ej. '1h', '7d').
   * @returns {Promise<string>} El token JWT generado.
   */
  async generateToken(payload, expiresIn = '1h') {
    return new Promise((resolve, reject) => {
      // Usamos jwtid para hacer el token único, útil para blacklisting si lo necesitas
      jwt.sign(payload, this.secret, { expiresIn, jwtid: crypto.randomUUID() }, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    });
  }
}

// Exportamos una instancia para que otros módulos puedan usarla directamente.
export const tokenGeneratorService = new TokenGeneratorService();