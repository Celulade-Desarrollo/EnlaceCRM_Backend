import { getAsesoriasAsesorUseCase } from '../../application/usecases/asesoria/getAsesoriasAsesorUseCase.js';

export const obtenerAsesorias = async (req, res) => {
  try {
    const data = await getAsesoriasAsesorUseCase();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en obtenerAsesorias:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};