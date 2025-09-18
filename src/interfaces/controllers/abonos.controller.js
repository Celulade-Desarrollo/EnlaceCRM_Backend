import { createAbonoUseCase } from "../../application/usecases/abonos/createAbonoUseCase.js";
import { getExcelData } from "../../application/usecases/abonos/getAbonosUseCase.js";

export const getExcel = async (req, res) => {
  try {
    const data = await getExcelData();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

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
