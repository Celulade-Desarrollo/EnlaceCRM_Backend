import { getDepartamentosUseCase } from "../../application/usecases/ubicacion/getDepartamentosUseCase.js";
import { getCiudadesUseCase } from "../../application/usecases/ubicacion/getCiudadesUseCase.js";
import { getBarriosUseCase } from "../../application/usecases/ubicacion/getBarriosUseCase.js";
 
export const getDepartamentos = async (req, res) => {
  try {
    const data = await getDepartamentosUseCase();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    res.status(500).json({ error: "Error obteniendo departamentos" });
  }
};
 
export const getCiudades = async (req, res) => {
  try {
    const { idDepartamento } = req.params;
    const data = await getCiudadesUseCase(idDepartamento);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener ciudades:", error);
    res.status(500).json({ error: "Error obteniendo ciudades" });
  }
};
 
export const getBarrios = async (req, res) => {
  try {
    const { idCiudad } = req.params;
    const data = await getBarriosUseCase(idCiudad);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener barrios:", error);
    res.status(500).json({ error: "Error obteniendo barrios" });
  }
};