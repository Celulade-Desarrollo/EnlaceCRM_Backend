import { estadoCuentaService } from "../../application/services/estadoCuentaServiceInstance.js";

export const obtenerEstadoCuentaController = async (req, res) => {
  try {
    const { identificadorTendero } = req.query;

    if (!identificadorTendero) {
      return res.status(400).json({ mensaje: "El identificador del tendero es requerido." });
    }

    const resultado = await estadoCuentaService.obtenerEstadoCuenta(identificadorTendero);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error en el controlador EstadoCuenta:", error.message);
    res.status(500).json({ mensaje: error.message });
  }
};
