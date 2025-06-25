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
} from "../controllers/flujoRegistroEnlace.controller.js";

import { buscarUsuarioPorTelefono } from "../middleware/cedula_middleware.js";
import { sendOTP, verifyOTP } from "../controllers/twilio.controller.js";

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
 *               Numero_de_Cliente_Alpina: "123456"
 *               Cedula_Cliente: "123456789"
 *               Autorizacion_Habeas_Data: true
 *               Autorizacion_Medios_de_Contacto: true
 *               Numero_Celular: "3000000000"
 *               Correo_Electronico: "cliente@correo.com"
 *               Nombres: "Juan"
 *               Primer_Apellido: "Pérez"
 *               SegundoApellido: "Gómez"
 *               Genero: "Masculino"
 *               Estado_Civil: "Soltero"
 *               Fecha_de_Nacimiento: "1990-01-01"
 *               Pais_de_Nacimiento: "Colombia"
 *               Departamento_de_Nacimiento: "Antioquia"
 *               Nivel_Educativo: "Universitario"
 *               Estrato: "3"
 *               Grupo_Etnico: "Mestizo"
 *               Declara_Renta: false
 *               Esta_obligado_a_tener_RUT_por_tu_actividad_economica: true
 *               Ubicacion_del_Negocio_Departamento: "Cundinamarca"
 *               Ubicacion_del_Negocio_Ciudad: "Bogotá"
 *               Direccion: "Calle 123 #45-67"
 *               Detalles: "Local 1"
 *               Barrio: "Chapinero"
 *               Numero_de_neveras: "2"
 *               Registrado_Camara_Comercio: true
 *               Rango_de_Ingresos: "2-5 millones"
 *               Persona_expuesta_politicamente_PEP: false
 *               Familiar_expuesto_politicamente_PEP: false
 *               Operaciones_moneda_extranjera: false
 *               Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia: true
 *               Confirmacion_Identidad: true
 *     responses:
 *       201:
 *         description: Registro creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               Estado: "aprobado"
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

