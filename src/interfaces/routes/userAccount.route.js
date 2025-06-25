import { Router } from "express";
import {
  getAllUserAccounts,
  getUserAccountById,
  createUserAccount,
  deleteUserAccountById,
  AccountType
} from "../controllers/userAccount.controller.js";

import { buscarUsuarioPorTelefono } from "../middleware/cedula_middleware.js";

const UserAccountRoute = Router();

/**
 * @swagger
 * tags:
 *   name: UserAccount
 *   description: Gestión de cuentas de usuario
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtener todas las cuentas de usuario
 *     tags: [UserAccount]
 *     responses:
 *       200:
 *         description: Lista de cuentas de usuario
 */
UserAccountRoute.get("/api/user", getAllUserAccounts);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtener una cuenta de usuario por IdFlujoRegistro
 *     tags: [UserAccount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: IdFlujoRegistro de la cuenta
 *     responses:
 *       200:
 *         description: Cuenta encontrada
 *       404:
 *         description: No encontrado
 */
UserAccountRoute.get("/api/user/:id", getUserAccountById);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crear una nueva cuenta de usuario
 *     tags: [UserAccount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               IdFlujoRegistro: "123"
 *               CupoFinal: "10000"
 *               Numero_Cliente: "456"
 *     responses:
 *       201:
 *         description: Registro creado exitosamente
 *       400:
 *         description: Error de validación
 */
UserAccountRoute.post("/api/user", createUserAccount);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Eliminar una cuenta de usuario por IdFlujoRegistro
 *     tags: [UserAccount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: IdFlujoRegistro de la cuenta
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       404:
 *         description: No encontrado
 */
UserAccountRoute.delete("/api/user/:id", deleteUserAccountById);

/**
 * @swagger
 * /api/user/account/{Cedula}:
 *   get:
 *     summary: Obtener el tipo de cuenta de usuario (Usuario o Admin) por cédula
 *     tags: [UserAccount]
 *     parameters:
 *       - in: path
 *         name: Cedula
 *         required: true
 *         schema:
 *           type: string
 *         description: Cédula del usuario
 *     responses:
 *       200:
 *         description: Tipo de cuenta encontrado
 *       404:
 *         description: Usuario o Admin no encontrado
 */
UserAccountRoute.get("/api/user/account/:Cedula", buscarUsuarioPorTelefono);

export default UserAccountRoute; 