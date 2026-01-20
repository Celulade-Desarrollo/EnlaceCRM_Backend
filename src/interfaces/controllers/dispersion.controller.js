import { listarDispersiones } from "../../application/usecases/dispersion/listarDispersionesUseCase.js";
import ValidationError from "../../errors/Validation.error.js";

export const listarDispersionController = async (req, res) => {
  try {
    const dispersiones = await listarDispersiones();
    res.json(dispersiones);
  } catch (error) {
    console.error("Error al listar dispersiones:", error.message);
    res.status(500).json({ error: "Error al listar dispersiones" });
  }
}
