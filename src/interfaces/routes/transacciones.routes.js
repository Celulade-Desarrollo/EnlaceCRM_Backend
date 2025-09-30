// src/interfaces/routes/transacciones.routes.js
import express from "express";
import { authMiddleware } from "../middleware/token-middleware.js";
import { 
  getAllTransacciones, 
  exportTransaccionesExcel, 
  getTransaccionById, 
  crearTransaccion 
} from "../controllers/transacciones.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/transacciones:
 *   get:
 *     summary: Obtener todas las transacciones
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transacciones
 */
router.get("/", authMiddleware, getAllTransacciones);

/**
 * @swagger
 * /api/transacciones/excel:
 *   get:
 *     summary: Exportar transacciones a Excel
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Archivo Excel generado
 */
router.get("/excel", authMiddleware, exportTransaccionesExcel);

/**
 * @swagger
 * /api/transacciones/{id}:
 *   get:
 *     summary: Obtener una transacción por ID
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción
 *     responses:
 *       200:
 *         description: Transacción encontrada
 *       404:
 *         description: No encontrada
 */
router.get("/:id", authMiddleware, getTransaccionById);

/**
 * @swagger
 * /api/transacciones:
 *   post:
 *     summary: Crear una nueva transacción
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cedula
 *               - valor
 *             properties:
 *               cedula:
 *                 type: string
 *                 example: "1003801878"
 *               valor:
 *                 type: number
 *                 example: 50000
 *               codigoFactura:
 *                 type: string
 *                 example: "4261475"
 *     responses:
 *       201:
 *         description: Transacción creada exitosamente
 */
router.post("/", authMiddleware, crearTransaccion);

export default router;
