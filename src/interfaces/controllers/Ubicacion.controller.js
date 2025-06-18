import SQLServerUbicacionRepository from "../../infrastructure/persistence/SQLServerUbicacionRepository.js";
import UbicacionService from "../../application/services/UbicacionService.js";

const repository = new SQLServerUbicacionRepository();
const service = new UbicacionService(repository);

/**
 * @swagger
 * tags:
 *   name: Ubicación
 *   description: Gestión de departamentos, ciudades y barrios
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
export const getDepartamentos = async (req, res) => {
  try {
    const data = await service.obtenerDepartamentos();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener departamentos:", error); // 👈 Muestra todo el error
    res.status(500).json({ error: "Error obteniendo departamentos" });
  }
};

/**
 * @swagger
 * /api/ubicacion/ciudades/{idDepartamento}:
 *   get:
 *     summary: Obtener ciudades por departamento
 *     tags: [Ubicación]
 *     parameters:
 *       - in: path
 *         name: idDepartamento
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Lista de ciudades
 */
export const getCiudades = async (req, res) => {
  try {
    const { idDepartamento } = req.params;
    const data = await service.obtenerCiudades(idDepartamento);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener departamentos:", error); // 👈 Muestra todo el error
    res.status(500).json({ error: "Error obteniendo ciudades" });
  }
};

/**
 * @swagger
 * /api/ubicacion/barrios/{idCiudad}:
 *   get:
 *     summary: Obtener barrios por ciudad
 *     tags: [Ubicación]
 *     parameters:
 *       - in: path
 *         name: idCiudad
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ciudad
 *     responses:
 *       200:
 *         description: Lista de barrios
 */
export const getBarrios = async (req, res) => {
  try {
    const { idCiudad } = req.params;
    const data = await service.obtenerBarrios(idCiudad);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener departamentos:", error); // 👈 Muestra todo el error
    res.status(500).json({ error: "Error obteniendo barrios" });
  }
};
