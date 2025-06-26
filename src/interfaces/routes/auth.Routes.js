// Ruta: src/interfaces/routes/auth.Routes.js
import express from "express";
import { authController } from '../controllers/auth.controller.js'; // Importa el controlador delgado

const authRouter = express.Router();

// Define las rutas y apunta a los métodos del controlador
authRouter.post("/admin/login", (req, res) => authController.loginAdmin(req, res));
authRouter.post("/user/login-external", (req, res) => authController.loginUserWithExternalToken(req, res));

export default authRouter;