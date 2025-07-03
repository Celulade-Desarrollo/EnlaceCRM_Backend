import { MovimientoRepositoryImpl } from "../../infrastructure/repositories/MovimientoRepositoryImpl.js";
import { GetMovimientosUseCase } from "../../application/usecases/GetMovimientosUseCase.js";

const movimientoRepo = new MovimientoRepositoryImpl();
const getMovimientosUseCase = new GetMovimientosUseCase(movimientoRepo);

export const getMovimientosByCliente = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const movimientos = await getMovimientosUseCase.execute(clienteId);
    res.json(movimientos);
  } catch (error) {
    console.error("Error al obtener movimientos:", error.message);
    res.status(500).json({ error: "Error al obtener movimientos" });
  }
};
