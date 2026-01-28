import { listarDispersiones } from "../../application/usecases/dispersion/listarDispersionesUseCase.js";
import { updateEstadoBancoStatus } from "../../application/usecases/dispersion/updateEstadoBancoS.js";

export const listarDispersionController = async (req, res) => {
  try {
    const dispersiones = await listarDispersiones();
    res.json(dispersiones);
  } catch (error) {
    console.error("Error al listar dispersiones:", error.message);
    res.status(500).json({ error: "Error al listar dispersiones" });
  }
};

export const updateEstadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    await updateEstadoBancoStatus(id, estado);
    res.json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
