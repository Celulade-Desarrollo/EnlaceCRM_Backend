import { getAllTasaInteresesUseCase } from "../../application/usecases/tasaIntereses/getAllTasaInteresesUseCase.js";
import { updateTasaInteresesUseCase } from "../../application/usecases/tasaIntereses/updateTasaInteresesUseCase.js";

export async function getAllTasaIntereses(req, res) {
  try {
    const data = await getAllTasaInteresesUseCase();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const updateTasaIntereses = async (req, res) => {
  try {
    const { id } = req.params;
    const { valorFactorSeguro, tasaEfectivaAnual } = req.body;
    await updateTasaInteresesUseCase(id, valorFactorSeguro, tasaEfectivaAnual);
    res.json({ message: "Tasa de intereses actualizada correctamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
