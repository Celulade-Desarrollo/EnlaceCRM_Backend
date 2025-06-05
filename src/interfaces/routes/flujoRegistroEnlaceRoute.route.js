import express from "express";
const flujoRegistroEnlace = express.Router();

// Controladores
import {
  getAll,
  getById,
  getByAlpina,
  createRegistro,
  deleteById,
  getBynumber,
  getByEstado,
  updateEstadoById,
} from "../interfaces/controllers/flujoRegistroEnlace.controller.js";

import { buscarUsuarioPorTelefono } from "../middleware/phone_middleware.js";
import { sendOTP, verifyOTP } from "../controller/tiwilio.controller.js";

/**
 * @swagger
 * /api/twilio/send:
 *   post:
 *     summary: Enviar OTP usando Twilio
 *     tags: [FlujoRegistroEnlace]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               telefono: "3001234567"
 *     responses:
 *       200:
 *         description: OTP enviado
 */
flujoRegistroEnlace.post("/api/twilio/send", buscarUsuarioPorTelefono, sendOTP);

/**
 * @swagger
 * /api/twilio/verify:
 *   post:
 *     summary: Verificar OTP recibido
 *     tags: [FlujoRegistroEnlace]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               telefono: "3001234567"
 *               codigo: "123456"
 *     responses:
 *       200:
 *         description: OTP verificado
 */
flujoRegistroEnlace.post("/api/twilio/verify", verifyOTP);

/**
 * @swagger
 * /api/flujoRegistroEnlace:
 *   post:
 *     summary: Crear nuevo registro de flujo
 *     tags: [FlujoRegistroEnlace]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nombre: "Ejemplo"
 *               telefono: "3000000000"
 *     responses:
 *       201:
 *         description: Registro creado
 */
flujoRegistroEnlace.post("/api/flujoRegistroEnlace", createRegistro);

/**
 * @swagger
 * /api/flujoRegistroEnlace:
 *   get:
 *     summary: Obtener todos los registros
 *     tags: [FlujoRegistroEnlace]
 *     responses:
 *       200:
 *         description: Lista de registros
 */
flujoRegistroEnlace.get("/api/flujoRegistroEnlace", getAll);

/**
 * @swagger
 * /api/flujoRegistroEnlace/estado/pendiente:
 *   get:
 *     summary: Obtener registros con estado pendiente
 *     tags: [FlujoRegistroEnlace]
 *     responses:
 *       200:
 *         description: Registros encontrados
 */
flujoRegistroEnlace.get("/api/flujoRegistroEnlace/estado/pendiente", getByEstado);

/**
 * @swagger
 * /api/flujoRegistroEnlace/estado/pendiente/{id}:
 *   put:
 *     summary: Cambiar estado a completado por ID
 *     tags: [FlujoRegistroEnlace]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
flujoRegistroEnlace.put("/api/flujoRegistroEnlace/estado/pendiente/:id", updateEstadoById);

/**
 * @swagger
 * /api/flujoRegistroEnlace/{id}:
 *   get:
 *     summary: Obtener registro por ID
 *     tags: [FlujoRegistroEnlace]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
flujoRegistroEnlace.get("/api/flujoRegistroEnlace/:id", getById);

/**
 * @swagger
 * /api/flujoRegistroEnlace/alpina/{alpinaId}:
 *   get:
 *     summary: Obtener por ID de Alpina
 *     tags: [FlujoRegistroEnlace]
 *     parameters:
 *       - in: path
 *         name: alpinaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
flujoRegistroEnlace.get("/api/flujoRegistroEnlace/alpina/:alpinaId", getByAlpina);

/**
 * @swagger
 * /api/flujoRegistroEnlace/{id}:
 *   delete:
 *     summary: Eliminar registro por ID
 *     tags: [FlujoRegistroEnlace]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro eliminado
 */
flujoRegistroEnlace.delete("/api/flujoRegistroEnlace/:id", deleteById);

/**
 * @swagger
 * /api/flujoRegistroEnlace/num/{Numero_Celular}:
 *   get:
 *     summary: Obtener por número de celular
 *     tags: [FlujoRegistroEnlace]
 *     parameters:
 *       - in: path
 *         name: Numero_Celular
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
flujoRegistroEnlace.get("/api/flujoRegistroEnlace/num/:Numero_Celular", getBynumber);

export default flujoRegistroEnlace;

