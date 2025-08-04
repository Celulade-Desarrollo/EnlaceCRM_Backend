import express from "express";
import { validarMoraUseCase } from "../../application/usecases/verifyMora/verifyAplyMoraUseCase.js";


const router = express.Router();

/**
 * @swagger
 * /validar-mora:
 *   post:
 *     summary: Ejecuta validación manual de usuarios en mora
 *     tags: [Mora]
 *     responses:
 *       200:
 *         description: Resultado del proceso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalMarcados:
 *                   type: integer
 *                   example: 3
 */
router.post("/validar-mora", async (req, res) => {
  try {
    const resultado = await validarMoraUseCase();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
