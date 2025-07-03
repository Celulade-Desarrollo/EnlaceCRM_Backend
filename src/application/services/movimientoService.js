import { MovimientoRepositoryMySQL } from "../../infrastructure/repositories/MovimientoRepositoryImpl.js";
import { ObtenerMovimientosCliente } from "../usecases/GetMovimientosUseCase.js";

const movimientoRepo = new MovimientoRepositoryMySQL();
export const obtenerMovimientosCliente = new ObtenerMovimientosCliente(movimientoRepo);
