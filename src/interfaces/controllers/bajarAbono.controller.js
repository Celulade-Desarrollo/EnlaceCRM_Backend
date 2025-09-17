import { getExcelData } from "../../application/usecases/bajarAbonos/getAbonosUseCase.js";

const getExcel = async (req, res) => {
  try {
    const data = await getExcelData();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export  {
    getExcel
}