// src/routes/auth.Routes.js
import express from "express";
import { authController } from '../controllers/auth.controller.js';
// No necesitas importar authenticateToken si tu compañero lo aplica en otro lugar
// (por ejemplo, en un middleware global o en otras rutas específicas)
// import { authenticateToken } from '../interfaces/middleware/auth.middleware.js'; // Solo si lo usas aquí directamente

const authRouter = express.Router();

// --- RUTA para Login de ADMINISTRADORES (Genera tu token interno) ---
// POST /admin/login
/**
 * @swagger
 * /admin/login:
 * post:
 * summary: Iniciar sesión para administradores (cédula y contraseña)
 * tags: [Autenticación]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * cedula:
 * type: string
 * description: Cédula del administrador
 * password:
 * type: string
 * description: Contraseña del administrador
 * example:
 * cedula: "12345"
 * password: admin123
 * responses:
 * 200:
 * description: Token JWT para administrador generado exitosamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * 400:
 * description: Parámetros de entrada inválidos.
 * 401:
 * description: Credenciales de administrador inválidas.
 * 500:
 * description: Error interno del servidor.
 */
authRouter.post("/admin/login", (req, res) => authController.loginAdmin(req, res));

// --- RUTA para Login de USUARIOS (Genera tu token interno a partir de un token externo) ---
// POST /user/login-external
/**
 * @swagger
 * /user/login-external:
 * post:
 * summary: Iniciar sesión para usuarios con token externo y obtener token interno
 * tags: [Autenticación]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * externalToken:
 * type: string
 * description: Token proporcionado por la aplicación externa.
 * example:
 * externalToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWR1bGEiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJleHRlcm5hbF91c2VyIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE2NzgyNjI0MDAsImV4cCI6MTY3ODI2NjAwMH0.YOUR_EXTERNAL_TOKEN_HERE
 * responses:
 * 200:
 * description: Autenticación externa exitosa, token interno generado.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * token:
 * type: string
 * userData:
 * type: object
 * 400:
 * description: Token externo no proporcionado o inválido.
 * 403:
 * description: Token externo inválido o expirado.
 * 500:
 * description: Error interno del servidor.
 */
authRouter.post("/user/login-external", (req, res) => authController.loginUserWithExternalToken(req, res));

// NOTA: Las rutas protegidas (ej. "/protected-data") no las defines tú aquí
// si tu compañero las protegerá con el middleware. Él usará tu token que generas.
// Si tu quieres que este router también tenga rutas protegidas, sígnificaria
// que tu debes importar y usar el middleware de tu compañero aquí.
/*
// Ejemplo de cómo aplicarías el middleware de tu compañero si lo tuvieras aquí
authRouter.get("/my-protected-endpoint", authenticateToken, (req, res) => {
    res.json({ message: "¡Esta ruta está protegida!", user: req.user });
});
*/

export default authRouter;