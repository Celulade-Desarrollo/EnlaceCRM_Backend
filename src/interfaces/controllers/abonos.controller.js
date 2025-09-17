import { createAbonoUseCase } from "../../application/usecases/abonos/createAbonoUseCase.js";

export const createAbono = async (req, res) => {
  try {
    const { data } = req.body; 
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: "El body debe contener un array 'data'" });
    }

    await createAbonoUseCase(data);

    res.status(201).json({ message: "Abonos cargados exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
