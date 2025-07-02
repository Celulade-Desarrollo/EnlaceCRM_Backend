import { EstadoCuentaPagoAdapter } from "../../infrastructure/adapters/estadoCuentaPagoAdapter.js";

// Usar directamente el adapter como servicio
export const pagoService = new EstadoCuentaPagoAdapter();

