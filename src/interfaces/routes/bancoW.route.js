import express from "express";
import {
  getAllBancoW,
  getByFlujoIdBancoW,
  createBancoW,
  deleteBancoWbyId,
  updateCoreBancario
} from "../controllers/bancoW.controller.js";

const bancoW = express.Router();

/**
 * @swagger
 * /api/bancow:
 *   get:
 *     summary: Obtener todos los registros de bancoW
 *     tags: [BancoW]
 *     responses:
 *       200:
 *         description: Lista de registros
 */
bancoW.get("/api/bancow", getAllBancoW);

/**
 * @swagger
 * /api/bancow/{id}:
 *   get:
 *     summary: Obtener bancoW por ID de flujo
 *     tags: [BancoW]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de flujo
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
bancoW.get("/api/bancow/:id", getByFlujoIdBancoW);

/**
 * @swagger
 * /api/bancow:
 *   post:
 *     summary: Crear nuevo registro de bancoW
 *     tags: [BancoW]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               IdFlujoRegistro: "123"
 *               Validacion_Banco_Listas: "123"
 *               Aprobacion_Cupo_Sugerido: "123"
 *               Pagare_Digital_Firmado: "123"
 *               Creacion_Core_Bancario: "123"
 *               
 *     responses:
 *       201:
 *         description: Registro creado
 */
bancoW.post("/api/bancow", createBancoW);

/**
 * @swagger
 * /api/bancow/{id}:
 *   delete:
 *     summary: Eliminar bancoW por ID
 *     tags: [BancoW]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro a eliminar
 *     responses:
 *       200:
 *         description: Registro eliminado
 */
bancoW.delete("/api/bancow/:id", deleteBancoWbyId);

/**
 * @swagger
 * /api/coreBancario/{id}:
 *   put:
 *     summary: Actualizar información del core bancario
 *     tags: [BancoW]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del flujo de registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Pagare_Digital_Firmado:
 *                 type: string
 *                 description: Estado del pagaré digital firmado
 *               Creacion_Core_Bancario:
 *                 type: string
 *                 description: Estado de la creación del core bancario
 *               UsuarioAprobado:
 *                 type: string
 *                 description: Usuario que aprobó la operación
 *             example:
 *               Pagare_Digital_Firmado: "Completado"
 *               Creacion_Core_Bancario: "En proceso"
 *               UsuarioAprobado: "usuario123"
 *     responses:
 *       200:
 *         description: Core bancario actualizado exitosamente
 *       404:
 *         description: Flujo de registro no encontrado
 *       500:
 *         description: Error del servidor
 */
bancoW.put("/api/coreBancario/:id", updateCoreBancario)

export default bancoW;