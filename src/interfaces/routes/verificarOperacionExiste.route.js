import express from "express";
import { verificarOperacionExisteUseCase } from "../../application/usecases/verifyOperacion/verificarOperacionExisteUseCase.js";

const router = express.Router();

/**
 * @swagger
 * /abonos/existe/{operacion}:
 *   get:
 *     summary: Verifica si una operación ya existe en la base de datos
 *     tags: [Abonos]
 *     parameters:
 *       - in: path
 *         name: operacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de operación a verificar
 *     responses:
 *       200:
 *         description: Resultado de la verificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 existe:
 *                   type: boolean
 *                   example: true
 */
router.get("/existe/:operacion", async (req, res) => {
  try {
    const operacion = req.params.operacion;
    const existe = await verificarOperacionExisteUseCase(operacion); // <-- así se llama
    res.json({ existe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al verificar la operación" });
  }
});

export default router;