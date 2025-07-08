import express from 'express';
import { createUserAccount, obtenerTodosAdmin } from '../controllers/adminAccount.controller.js';

const adminRouter = express.Router();

/**
 * @swagger
 * /api/admin/create:
 *   post:
 *     summary: Crea una nueva cuenta de administrador
 *     tags: [AdminAccount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Numero_Admin:
 *                 type: string
 *               Nombre_Admin:
 *                 type: string
 *               Empresa_Admin:
 *                 type: string
 *               Cedula_Admin:
 *                 type: string
 *               Contrasena:
 *                 type: string
 *             required:
 *               - Numero_Admin
 *               - Nombre_Admin
 *               - Empresa_Admin
 *               - Cedula_Admin
 *               - Contrasena
 *     responses:
 *       201:
 *         description: Cuenta de administrador creada correctamente
 *       400:
 *         description: Error en la creación
 */
adminRouter.post('/api/admin/create', createUserAccount);

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Obtiene todas las cuentas de administrador
 *     tags: [AdminAccount]
 *     responses:
 *       200:
 *         description: Lista de cuentas de administrador
 *       400:
 *         description: Error al obtener los administradores
 */
adminRouter.get('/api/admin', obtenerTodosAdmin);

export default adminRouter;
