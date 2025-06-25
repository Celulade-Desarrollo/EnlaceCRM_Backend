// src/interfaces/controllers/auth.controller.js
import { jwtService } from '../../application/services/tokenService.js';

export class AuthController {
  constructor(jwtServiceInstance) {
    this.jwtService = jwtServiceInstance;
  }

  // --- Método para Login de ADMINISTRADORES (Cédula y Contraseña) ---
  // Este método recibe la cédula y contraseña, las valida, y si son correctas,
  // USA TU JwtService para GENERAR EL TOKEN con el payload del admin.
  async loginAdmin(req, res) {
    const { cedula, password } = req.body;

    if (typeof cedula !== "string" || typeof password !== "string" || !cedula || !password) {
      return res.status(400).json({ error: "Cédula y password son requeridos y deben ser strings válidos." });
    }

    // SIMULACIÓN DE AUTENTICACIÓN DE ADMINISTRADOR:
    // *** REEMPLAZA ESTO CON TU LÓGICA REAL DE CONSULTA A BASE DE DATOS Y VERIFICACIÓN DE CONTRASEÑA ***
    // (Ej. Buscar usuario por cédula, comparar hash de contraseña)
    if (cedula === '12345' && password === 'admin123') { // Credenciales de ejemplo
      // Si la autenticación es exitosa, construye el OBJETO (PAYLOAD) para el token
      const adminPayload = {
        cedula: cedula, // La cédula es el identificador clave
        username: 'admin_user', // Información adicional
        roles: ['admin', 'manager'], // Roles del administrador
      };
      try {
        // Usa tu JwtService para GENERAR EL TOKEN con el objeto (payload)
        const token = await this.jwtService.generateToken(adminPayload, '2h'); // Token válido por 2 horas

        if (token) {
          return res.status(200).json({ token });
        } else {
          return res.status(500).json({ error: "Error al generar el token de administrador." });
        }
      } catch (error) {
        console.error("AuthController - Error en loginAdmin al generar token:", error);
        return res.status(500).json({ error: "Error interno del servidor al procesar el login de administrador." });
      }
    } else {
      return res.status(401).json({ error: "Credenciales de administrador inválidas (cédula o contraseña)." });
    }
  }

  // --- Método para Login de USUARIOS (con Token Externo) ---
  // Este método recibe un token externo, lo valida, y si es válido,
  // USA TU JwtService para GENERAR UN TOKEN INTERNO con el payload del usuario.
  async loginUserWithExternalToken(req, res) {
    const { externalToken } = req.body;

    if (!externalToken || typeof externalToken !== 'string') {
      return res.status(400).json({ error: "Token externo no proporcionado o inválido." });
    }

    try {
      // Primero, verifica el token externo
      // (que tu JwtService lo puede manejar con un secreto para tokens externos si son diferentes).
      // Aquí estamos usando el mismo JWT_SECRET para verificar, lo cual podría no ser lo que necesitas
      // si el token externo fue firmado con un secreto diferente. Si es así, necesitarías un nuevo método
      // en JwtService para verificar con un secreto específico para tokens externos.
      const decodedExternalPayload = await this.jwtService.verifyToken(externalToken);

      if (!decodedExternalPayload) {
        return res.status(403).json({ error: "Token externo inválido o expirado. Acceso denegado." });
      }

      // VALIDACIÓN CRÍTICA: Asegúrate de que el token externo contenga la 'cédula'.
      const cedulaFromExternalToken = decodedExternalPayload.cedula;

      if (!cedulaFromExternalToken || typeof cedulaFromExternalToken !== 'string') {
          return res.status(400).json({ error: "Token externo válido, pero no contiene una 'cédula' válida." });
      }

      // Si la validación del token externo es exitosa, construye el OBJETO (PAYLOAD) para el token INTERNO.
      const internalPayload = {
        cedula: cedulaFromExternalToken, // La cédula es el identificador clave
        username: decodedExternalPayload.username || 'usuario_externo', // Información adicional del token externo o default
        roles: decodedExternalPayload.roles || ['user'], // Roles asignados o extraídos del token externo
      };

      // Usa tu JwtService para GENERAR EL TOKEN INTERNO con el objeto (payload)
      const internalToken = await this.jwtService.generateToken(internalPayload, '1h'); // Token interno válido por 1 hora

      if (internalToken) {
        return res.status(200).json({
          message: "Autenticación externa exitosa. Token interno generado.",
          token: internalToken, // Devuelve este token a tu frontend
          userData: internalPayload // Opcional: información del usuario
        });
      } else {
        return res.status(500).json({ error: "Error interno al generar token interno para usuario." });
      }

    } catch (error) {
      console.error("AuthController - Error al validar token externo:", error);
      return res.status(500).json({ error: "Error interno del servidor al procesar token externo." });
    }
  }
}

export const authController = new AuthController(jwtService);