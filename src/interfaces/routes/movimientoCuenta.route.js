import express from "express";
import { registrarMovimientoController, getMovimientosByCliente, listarMovimientosParaEnlaceController, listarRecaudoParaTransportistaController, calcularInteresesController, actualizarAbonoMovimiento,actualizarTelefonoTransportistaController } from "../controllers/movimientoCuenta.controller.js";

import { authMiddleware } from "../middleware/token-middleware.js";


const router = express.Router();

    

/**
 * @swagger
 * /api/movimientos:
 *   post:
 *     summary: Registra un movimiento financiero (pago, abono, ajuste, interés o comisión) y actualiza el saldo del tendero
 *     tags:
 *       - Movimientos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identificadorTendero
 *               - monto
 *               - tipoMovimiento
 *             properties:
 *               identificadorTendero:
 *                 type: string
 *               monto:
 *                 type: number
 *                 format: float
 *                 example: 100000
 *               tipoMovimiento:
 *                 type: integer
 *                 enum: [1, 2, 3, 4, 5]
 *                 description: >
 *                   Tipo de movimiento:
 *                   - 1 = PAGO (Débito resta del saldo)
 *                   - 2 = ABONO (Crédito suma al saldo)
 *                   - 3 = AJUSTE
 *                   - 4 = INTERES
 *                   - 5 = COMISION
 *               descripcion:
 *                 type: string
 *               fechaPagoProgramado:
 *                 type: string
 *                 format: date
 *               idMedioPago:
 *                 type: integer
 *               nroFacturaAlpina:
 *                 type: string
 *               telefonoTransportista:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movimiento registrado correctamente
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/api/movimientos", registrarMovimientoController);

/**
 * @swagger
 * tags:
 *   name: Movimientos
 *   description: Consulta de movimientos de crédito (pagos y abonos)
 */

/**
 * @swagger
 * /api/movimientos/{clienteId}:
 *   get:
 *     summary: Obtener los movimientos (pagos y abonos) de los últimos 3 meses de un cliente
 *     tags: [Movimientos]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de movimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IdMovimiento:
 *                     type: integer
 *                   IdUsuarioFinal:
 *                     type: integer
 *                   FechaMovimiento:
 *                     type: string
 *                     format: date-time
 *                   IdTipoMovimiento:
 *                     type: integer
 *                   IdEstadoMovimiento:
 *                     type: integer
 *                   Monto:
 *                     type: number
 *                   Descripcion:
 *                     type: string
 *                   FechaPagoProgramado:
 *                     type: string. 
 *                     format: date-time
 */
router.get("/api/movimientos/:clienteId", getMovimientosByCliente );

/**
 * @swagger
 * /api/listar/enlace/movimientos:
 *   get:
 *     summary: Obtener todos los movimientos de tipo Enlace
 *     description: Retorna todos los movimientos de tipo 1 (Enlace) con información del usuario
 *     tags: 
 *       - Movimientos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimientos encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IdMovimiento:
 *                     type: integer
 *                     description: ID único del movimiento
 *                   IdUsuarioFinal:
 *                     type: integer
 *                     description: ID del usuario
 *                   FechaHoraMovimiento:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del movimiento
 *                   IdTipoMovimiento:
 *                     type: integer
 *                     description: Tipo de movimiento (1 para Enlace)
 *                   Monto:
 *                     type: number
 *                     description: Monto del movimiento
 *                   Descripcion:
 *                     type: string
 *                     description: Descripción del movimiento
 *                   Cedula_Usuario:
 *                     type: string
 *                     description: Cédula del usuario
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get("/api/listar/enlace/movimientos", listarMovimientosParaEnlaceController);


/**
 * @swagger
 * /api/calcular-intereses:
 *   post:
 *     summary: Calcular intereses de un movimiento
 *     description: Calcula los intereses basados en el monto y fechas del movimiento
 *     tags: 
 *       - Movimientos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMovimiento:
 *                 type: integer
 *                 description: ID del movimiento a calcular
 *             required:
 *               - idMovimiento
 *     responses:
 *       200:
 *         description: Intereses calculados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idMovimiento:
 *                   type: integer
 *                   description: ID del movimiento
 *                 montoOriginal:
 *                   type: number
 *                   description: Monto original del movimiento
 *                 intereses:
 *                   type: number
 *                   description: Monto de intereses calculados
 *                 total:
 *                   type: number
 *                   description: Monto total (original + intereses)
 *                 fechaCalculo:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha del cálculo
 *       400:
 *         description: Datos inválidos o movimiento no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.put("/api/actualizarIntereses/:IdMovimiento", calcularInteresesController);

/**
 * @swagger
 * /api/recaudo:
 *   get:
 *     summary: Listar recaudo para transportista
 *     description: Devuelve los movimientos de recaudo asociados a un transportista.
 *     tags:
 *       - Movimientos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: numTransportista
 *         required: true
 *         schema:
 *           type: string
 *         description: Número o identificador del transportista
 *     responses:
 *       200:
 *         description: Recaudo obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Parámetros inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get("/api/recaudo/:numTransportista", listarRecaudoParaTransportistaController);

/**
 * @swagger
 * /api/calcular-intereses:
 *   post:
 *     summary: Calcular intereses de un movimiento
 *     description: Calcula los intereses basados en el monto y fechas del movimiento
 *     tags: 
 *       - Movimientos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMovimiento:
 *                 type: integer
 *                 description: ID del movimiento a calcular
 *             required:
 *               - idMovimiento
 *     responses:
 *       200:
 *         description: Intereses calculados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idMovimiento:
 *                   type: integer
 *                   description: ID del movimiento
 *                 montoOriginal:
 *                   type: number
 *                   description: Monto original del movimiento
 *                 intereses:
 *                   type: number
 *                   description: Monto de intereses calculados
 *                 total:
 *                   type: number
 *                   description: Monto total (original + intereses)
 *                 fechaCalculo:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha del cálculo
 *       400:
 *         description: Datos inválidos o movimiento no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.put("/api/actualizarAbono/:IdMovimiento", actualizarAbonoMovimiento);

router.put("/api/movimientos/actualizar-telefono", actualizarTelefonoTransportistaController);

export default router;
