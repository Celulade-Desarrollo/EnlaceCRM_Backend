import express from "express";
import {
  getDepartamentos,
  getCiudades,
  getBarrios,
} from "../controllers/Ubicacion.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ubicación
 *   description: Endpoints para departamentos, ciudades y barrios
 */

/**
 * @swagger
 * /api/ubicacion/departamentos:
 *   get:
 *     summary: Obtener todos los departamentos
 *     tags: [Ubicación]
 *     responses:
 *       200:
 *         description: Lista de departamentos
 */
router.get("/api/ubicacion/departamentos", getDepartamentos);

/**
 * @swagger
 * /api/ubicacion/ciudades/{idDepartamento}:
 *   get:
 *     summary: Obtener ciudades por ID de departamento
 *     tags: [Ubicación]
 *     parameters:
 *       - name: idDepartamento
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Lista de ciudades
 */
router.get("/api/ubicacion/ciudades/:idDepartamento", getCiudades);

/**
 * @swagger
 * /api/ubicacion/barrios/{idCiudad}:
 *   get:
 *     summary: Obtener barrios por ID de ciudad
 *     tags: [Ubicación]
 *     parameters:
 *       - name: idCiudad
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ciudad
 *     responses:
 *       200:
 *         description: Lista de barrios
 */
router.get("/api/ubicacion/barrios/:idCiudad", getBarrios);

export default router;
