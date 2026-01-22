import { getRecaudoFromEstadoCuentaServiceController, crearRegistroTesoreriaController, actualizarDispersionController, asignarDispersionAlpinaController, asignarDispersionSurtialimentosController, procesarYGuardarRecaudoController, consultarDatosRecaudoController, crearRegistroConDispersionController, consultarRegistrosSinDispersionController } from "../controllers/tesoreria.controller.js";
import Router from "express";
const tesoreria = Router();


/**
 * @swagger
 * /recaudo-transportista-fecha:
 *   get:
 *     summary: Obtener recaudación del estado de cuenta por fecha
 *     description: Recupera datos de recaudación de transportistas filtrados por fecha desde el servicio de estado de cuenta
 *     tags:
 *       - Tesoreria
 *     responses:
 *       200:
 *         description: Respuesta exitosa con datos de recaudación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Parámetros de solicitud inválidos
 *       500:
 *         description: Error interno del servidor
 */
tesoreria.get("/recaudo-transportista-fecha", getRecaudoFromEstadoCuentaServiceController);

/**
 * @swagger
 * /crear-registro:
 *   post:
 *     summary: Crear registro en tesorería
 *     description: Crea un nuevo registro en tesorería basado en los datos de estado de cuenta
 *     tags:
 *       - Tesoreria
 *     responses:
 *       200:
 *         description: Registro creado exitosamente
 *       500:
 *         description: Error interno del servidor
 */
tesoreria.post("/crear-registro", crearRegistroTesoreriaController);

/**
 * @swagger
 * /actualizar-dispersion:
 *   put:
 *     summary: Actualizar dispersión de un registro en tesorería
 *     description: Actualiza la dispersión de un registro específico en tesorería usando el ID y el valor de dispersión (Alpina o Surtialimentos)
 *     tags:
 *       - Tesoreria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del registro en tesorería
 *               dispersion:
 *                 type: string
 *                 enum: ["Alpina", "Surtialimentos"]
 *                 description: Valor de dispersión
 *             required:
 *               - id
 *               - dispersion
 *     responses:
 *       200:
 *         description: Dispersión actualizada exitosamente
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */
tesoreria.put("/actualizar-dispersion", actualizarDispersionController);

/**
 * @swagger
 * /asignar-alpina/{id}:
 *   put:
 *     summary: Asignar dispersión a Alpina
 *     description: Asigna la dispersión 'Alpina' a un registro específico en tesorería y actualiza el estado
 *     tags:
 *       - Tesoreria
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro en tesorería
 *     responses:
 *       200:
 *         description: Dispersión asignada exitosamente
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */
tesoreria.put("/asignar-alpina/:id", asignarDispersionAlpinaController);

/**
 * @swagger
 * /asignar-surtialimentos/{id}:
 *   put:
 *     summary: Asignar dispersión a Surtialimentos
 *     description: Asigna la dispersión 'Surtialimentos' a un registro específico en tesorería y actualiza el estado
 *     tags:
 *       - Tesoreria
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro en tesorería
 *     responses:
 *       200:
 *         description: Dispersión asignada exitosamente
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */
tesoreria.put("/asignar-surtialimentos/:id", asignarDispersionSurtialimentosController);

/**
 * @swagger
 * /procesar-guardar-recaudo:
 *   post:
 *     summary: Procesar y guardar recaudo único por fecha
 *     description: Obtiene datos de recaudo, filtra registros únicos por fecha (día, mes, año) y los guarda en la tabla Recaudo
 *     tags:
 *       - Tesoreria
 *     responses:
 *       200:
 *         description: Recaudos procesados y guardados exitosamente
 *       500:
 *         description: Error interno del servidor
 */
tesoreria.post("/procesar-guardar-recaudo", procesarYGuardarRecaudoController);

/**
 * @swagger
 * /consultar-datos-recaudo:
 *   get:
 *     summary: Consultar datos de recaudo
 *     description: Obtiene todos los registros de recaudo almacenados en la base de datos
 *     tags:
 *       - Tesoreria
 *     responses:
 *       200:
 *         description: Datos de recaudo obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fecha:
 *                         type: string
 *                         format: date
 *                       recaudo:
 *                         type: integer
 *       500:
 *         description: Error interno del servidor
 */
tesoreria.get("/consultar-datos-recaudo", consultarDatosRecaudoController);

/**
 * @swagger
 * /crear-registro-con-dispersion:
 *   post:
 *     summary: Crear registros en tesorería con dispersión
 *     description: Crea registros en tesorería usando datos de recaudo, asignando dispersión y marcando como procesado
 *     tags:
 *       - Tesoreria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date-time
 *                 recaudo:
 *                   type: integer
 *                 dispersion:
 *                   type: string
 *                   enum: ["Alpina", "Surtialimentos"]
 *               required:
 *                 - fecha
 *                 - recaudo
 *                 - dispersion
 *     responses:
 *       200:
 *         description: Registros creados exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
tesoreria.post("/crear-registro-con-dispersion", crearRegistroConDispersionController);

/**
 * @swagger
 * /consultar-registros-sin-dispersion:
 *   get:
 *     summary: Consultar registros de tesorería sin dispersión asignada
 *     description: Obtiene todos los registros de tesorería donde la dispersión es null
 *     tags:
 *       - Tesoreria
 *     responses:
 *       200:
 *         description: Registros obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       fecha:
 *                         type: string
 *                         format: date-time
 *                       recaudo:
 *                         type: integer
 *                       dispersion:
 *                         type: string
 *                         nullable: true
 *                       tesoreria_status:
 *                         type: boolean
 *                       banco_status:
 *                         type: boolean
 *       500:
 *         description: Error interno del servidor
 */
tesoreria.get("/consultar-registros-sin-dispersion", consultarRegistrosSinDispersionController);

export default tesoreria;