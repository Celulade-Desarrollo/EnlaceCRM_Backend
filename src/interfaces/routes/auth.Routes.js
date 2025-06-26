// Ruta: src/interfaces/routes/auth.Routes.js
import express from "express";
import { loginUserAccount } from '../controllers/auth.controller.js'; // Importa el controlador delgado

const authRouter = express.Router();

// Define las rutas y apunta a los métodos del controlador
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login de tenderos 
 *     tags: [UserAccountLogin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nbCliente: "123"
 *               nbAgenteComercial: "123"
 *               token: "123"
 *     responses:
 *       201:
 *         description: Login exitoso
 */
authRouter.post("/api/user/login", loginUserAccount );
authRouter.post("/user/login-external", (req, res) => authController.loginUserWithExternalToken(req, res));

export default authRouter;
