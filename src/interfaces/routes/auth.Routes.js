// Ruta: src/interfaces/routes/auth.Routes.js
import express from "express";
import { loginAdminAccount, loginUserAccount } from '../controllers/auth.controller.js'; // Importa el controlador delgado

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

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Login de administrador 
 *     tags: [AdminAccountLogin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               Cedula: "123"
 *               Password: "123"
 *     responses:
 *       201:
 *         description: Login exitoso
 */
authRouter.post("/api/admin/login", loginAdminAccount)

export default authRouter;
