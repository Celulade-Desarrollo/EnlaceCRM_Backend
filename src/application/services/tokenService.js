  // src/application/services/tokenService.js
  import jwt from 'jsonwebtoken';
  import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos para el token (JTI)

  // Carga tu secreto JWT desde las variables de entorno. ¡ESENCIAL!
  const JWT_SECRET = process.env.JWT_SECRET;

  // VERIFICACIÓN CRÍTICA: Asegura que el secreto esté definido al iniciar la aplicación.
  if (!JWT_SECRET) {
    console.error('ERROR CRÍTICO: La variable de entorno JWT_SECRET no está definida. La aplicación no puede iniciar de forma segura sin ella. Por favor, define JWT_SECRET en tu archivo .env');
    // Opcional: throw new Error('JWT_SECRET no definido'); para detener el inicio si es crítico.
  }

  export class JwtService {
    constructor() {
      this.secret = JWT_SECRET;
    }

    /**
     * Genera un token JWT a partir de un objeto (payload) dado.
     * Este es el método que tu compañero se refiere a "hacer el token con un objeto".
     *
     * @param {object} payload - El objeto que contendrá la información del usuario (ej. { cedula: '123', roles: ['user'] }).
     * @param {string} [duration='1h'] - La duración del token (ej. '15m', '1h', '7d'). Por defecto 1 hora.
     * @returns {Promise<string | null>} El token JWT como string, o null si falla.
     */
    async generateToken(payload, duration = '1h') {
      return new Promise((resolve) => {
        if (!this.secret) {
          console.error('JwtService: No se pudo generar el token. JWT_SECRET no está configurado.');
          return resolve(null);
        }

        // Añadir 'jti' (JWT ID) para un identificador único del token (útil para invalidación/blacklist)
        const finalPayload = { ...payload, jti: uuidv4() };

        jwt.sign(finalPayload, this.secret, { expiresIn: duration, algorithm: 'HS256' }, (err, token) => {
          if (err) {
            console.error('JwtService - Error al generar token:', err);
            return resolve(null);
          }
          resolve(token);
        });
      });
    }

    /**
     * Verifica y decodifica un token JWT.
     * Aunque tu compañero haga el middleware, este método es esencial para la verificación.
     * Lo dejamos aquí ya que es la responsabilidad natural de este servicio.
     *
     * @param {string} token - El token JWT a verificar.
     * @returns {Promise<object | null>} El payload decodificado del token, o null si es inválido/expirado.
     */
    async verifyToken(token) {
      return new Promise((resolve) => {
        if (!this.secret) {
          console.error('JwtService: No se pudo verificar el token. JWT_SECRET no está configurado.');
          return resolve(null);
        }

        jwt.verify(token, this.secret, (err, decoded) => {
          if (err) {
            // console.error('JwtService - Error al verificar token:', err.message); // Descomenta si quieres ver errores detallados de JWT
            return resolve(null); // Retorna null si el token es inválido o expirado
          }
          resolve(decoded);
        });
      });
    }
  }

  // Exporta una instancia para que otros módulos puedan usarlo directamente.
  export const jwtService = new JwtService();