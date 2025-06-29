import { getFacturasPendientesUseCase } from "../../application/usecases/alpina/getFacturasPendientesUseCase.js";


async function obtenerFacturas(req, res) {
  try {
    const { identificadorTendero } = req.query;

    const facturas = await getFacturasPendientesUseCase(identificadorTendero);
    res.status(200).json(facturas);
  } catch (error) {
    console.error('Error en el controlador Alpina:', error.message);
    res.status(500).json({ mensaje: error.message });
  }
}

export { obtenerFacturas }; 

