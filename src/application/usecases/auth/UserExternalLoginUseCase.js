// src/application/usecases/auth/UserExternalLoginUseCase.js
import { tokenVerifierService } from '../../services/TokenVerifierService.js';
import { tokenGeneratorService } from '../../services/TokenGeneratorService.js';
// RUTAS CORREGIDAS para repositorios
import { userRepository } from '../../../infrastructure/repositories/UserRepository.js'; // <-- ¡ESTA ES LA BUENA!
import { adminRepository } from '../../../infrastructure/repositories/AdminRepository.js'; // <-- ¡ESTA ES LA BUENA!

export class UserExternalLoginUseCase {
  constructor(tokenVerService, tokenGenService, userRepo, adminRepo) {
    this.tokenVerifierService = tokenVerService;
    this.tokenGeneratorService = tokenGenService;
    this.userRepository = userRepo;
    this.adminRepository = adminRepo;
  }

  /**
   * Procesa un token externo, verifica su firma (con nuestro secreto), busca el usuario en DB,
   * y genera un token interno.
   * @param {string} externalToken - El token JWT recibido de la aplicación externa.
   * @returns {Promise<object | null>} Un objeto con el token interno y userData, o null si falla.
   */
  async execute(externalToken) {
    // 1. Verifica el token externo usando nuestro TokenVerifierService.
    // **IMPORTANTE:** Aquí se verifica la firma con tu JWT_SECRET, como te indicó tu compañero.
    const decodedExternalPayload = await this.tokenVerifierService.verifyToken(externalToken);

    if (!decodedExternalPayload) {
      // Si la verificación falla (firma incorrecta, expirado, etc.), devolvemos null.
      return null;
    }

    const cedulaFromExternalToken = decodedExternalPayload.cedula; // Asume que la cédula viene en el payload.
    if (!cedulaFromExternalToken || typeof cedulaFromExternalToken !== 'string') {
      throw new Error("Token externo válido, pero no contiene una 'cédula' válida en su payload.");
    }

    // 2. Busca al usuario (o admin) en nuestra DB usando la cédula extraída.
    let internalPayload = null;

    // Primero intenta buscar como UsuarioFinal
    const user = await this.userRepository.findByCedula(cedulaFromExternalToken);

    if (user) {
      internalPayload = {
        cedula: user.Cedula_Usuario,
        username: user.Numero_Cliente || `user_${user.Cedula_Usuario}`,
        roles: user.Roles ? user.Roles.split(',') : ['user'],
      };
    } else {
      // Si no es un UsuarioFinal, intenta buscar como Administrador (si aplica a tu lógica)
      const admin = await this.adminRepository.findByCedula(cedulaFromExternalToken);
      if (admin) {
        internalPayload = {
          cedula: admin.Cedula_Admin,
          username: admin.Nombre || `admin_${admin.Cedula_Admin}`,
          roles: admin.Roles ? admin.Roles.split(',') : ['admin'],
        };
      }
    }

    if (!internalPayload) {
      throw new Error("Cédula del token externo no registrada en la base de datos interna.");
    }

    // 3. Genera el token interno para nuestra aplicación usando TokenGeneratorService.
    const internalToken = await this.tokenGeneratorService.generateToken(internalPayload, '1h');

    if (!internalToken) {
      throw new Error("Error interno al generar token interno para usuario externo.");
    }

    return { token: internalToken, userData: internalPayload }; // Retorna el token y los datos del usuario.
  }
}

// Exportamos una instancia, inyectando las dependencias.
export const userExternalLoginUseCase = new UserExternalLoginUseCase(
  tokenVerifierService,
  tokenGeneratorService,
  userRepository,
  adminRepository
);