import { updateCupoBanco } from "../../application/usecases/editCupo/updateCupoBanco.js";

export const updateCupoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { cupo } = req.body;
    await updateCupoBanco(id, cupo);
    res.json({ message: "Cupo actualizado correctamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};