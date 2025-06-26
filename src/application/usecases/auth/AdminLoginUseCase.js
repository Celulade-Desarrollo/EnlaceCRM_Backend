import bcrypt from 'bcrypt';
// Ruta corregida para adminRepository:
// Pasos: salir de 'auth' (../) -> salir de 'usecases' (../../) -> salir de 'application' (../../../) -> entrar a 'infrastructure' (infrastructure/) -> entrar a 'persistence' (persistence/) -> entrar a 'repositories' (repositories/)
import { adminRepository } from '../../../infrastructure/repositories/AdminRepository.js';
// Ruta corregida para tokenGeneratorService:
// Pasos: salir de 'auth' (../) -> salir de 'usecases' (../../) -> entrar a 'services' (services/)
import { tokenGeneratorService } from '../../services/TokenGeneratorService.js';

export class AdminLoginUseCase {
  constructor(adminRepo, tokenGenService) {
    this.adminRepository = adminRepo;
    this.tokenGeneratorService = tokenGenService;
  }

  /**
   * Ejecuta la lógica de autenticación del administrador: verifica credenciales y genera token.
   * @param {string} cedula - La cédula del administrador.
   * @param {string} password - La contraseña en texto plano.
   * @returns {Promise<string | null>} El token JWT si la autenticación es exitosa, o null si falla.
   */
  async execute(cedula, password) {
    const admin = await this.adminRepository.findByCedula(cedula);

    if (!admin) {
      return null; // Administrador no encontrado
    }

    // Compara la contraseña ingresada con la contraseña hasheada de la DB
    const isPasswordValid = await bcrypt.compare(password, admin.Contrasena);

    if (!isPasswordValid) {
      return null; // Contraseña incorrecta
    }

    // Prepara el payload para el token interno
    const adminPayload = {
      cedula: admin.Cedula_Admin,
      username: admin.Nombre || `admin_${admin.Cedula_Admin}`,
      roles: admin.Roles ? admin.Roles.split(',') : ['admin'], // Asume que 'Roles' es un string 'admin,manager'
    };

    // Usa el TokenGeneratorService para generar el token
    const token = await this.tokenGeneratorService.generateToken(adminPayload, '2h');

    return token; // Devuelve el token
  }
}

// Exportamos una instancia, inyectando las dependencias.
export const adminLoginUseCase = new AdminLoginUseCase(adminRepository, tokenGeneratorService);