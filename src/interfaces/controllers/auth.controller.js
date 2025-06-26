import { adminLoginUseCase } from '../../application/usecases/auth/AdminLoginUseCase.js'; // <-- ¡Verifica este path!
import { userExternalLoginUseCase } from '../../application/usecases/auth/UserExternalLoginUseCase.js'; // <-- ¡Verifica este path!

export class AuthController {
  constructor(adminLoginUC, userExternalLoginUC) {
    this.adminLoginUseCase = adminLoginUC;
    this.userExternalLoginUseCase = userExternalLoginUC;
  }

  // --- Manejador para la ruta de Login de ADMINISTRADORES ---
  async loginAdmin(req, res) {
    const { cedula, password } = req.body;

    if (typeof cedula !== "string" || typeof password !== "string" || !cedula || !password) {
      return res.status(400).json({ error: "Cédula y password son requeridos y deben ser strings válidos." });
    }

    try {
      // El controlador delega TODA la lógica de negocio al Caso de Uso
      const token = await this.adminLoginUseCase.execute(cedula, password);

      if (!token) {
        return res.status(401).json({ error: "Credenciales de administrador inválidas (cédula o contraseña)." });
      }

      return res.status(200).json({ token });
    } catch (error) {
      console.error("AuthController - Error en loginAdmin (delegado a caso de uso):", error.message);
      return res.status(500).json({ error: "Error interno del servidor al procesar el login de administrador." });
    }
  }

  // --- Manejador para la ruta de Login de USUARIOS (con Token Externo) ---
  async loginUserWithExternalToken(req, res) {
    const { externalToken } = req.body;

    if (!externalToken || typeof externalToken !== 'string') {
      return res.status(400).json({ error: "Token externo no proporcionado o inválido." });
    }

    try {
      // El controlador delega TODA la lógica de negocio al Caso de Uso
      const result = await this.userExternalLoginUseCase.execute(externalToken);

      if (!result || !result.token) {
        return res.status(403).json({ error: "Token externo inválido, expirado o cédula no registrada. Acceso denegado." });
      }

      return res.status(200).json({
        message: "Autenticación externa exitosa. Token interno generado.",
        token: result.token,
        userData: result.userData
      });
    } catch (error) {
      console.error("AuthController - Error en loginUserWithExternalToken (delegado a caso de uso):", error.message);
      // Aquí, los errores lanzados por el caso de uso se capturan y se envían.
      return res.status(500).json({ error: error.message || "Error interno del servidor al procesar token externo." });
    }
  }
}

// Exportamos una instancia del controlador, inyectándole sus dependencias (los casos de uso).
export const authController = new AuthController(adminLoginUseCase, userExternalLoginUseCase);