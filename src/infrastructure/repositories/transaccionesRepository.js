import { poolPromise } from "../persistence/database.js";
import { TransaccionesAdapter } from "../adapters/TransaccionesAdapter.js";

export const transaccionesRepository = new TransaccionesAdapter(poolPromise);
