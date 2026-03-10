import { getAllTasaInteresesUseCase } from "../../application/usecases/tasaIntereses/getAllTasaInteresesUseCase.js";

export async function getAllTasaIntereses(req, res) {
  try {
    const data = await getAllTasaInteresesUseCase();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
