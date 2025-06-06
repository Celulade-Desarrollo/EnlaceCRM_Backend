import { FlujoRegistroAdapter } from "../../infrastructure/adapters/FlujoRegistroAdapter.js";

/**
 * Instancia concreta del servicio que implementa el puerto de dominio
 * para Flujo de Registro.
 */
export const flujoRegistroService = new FlujoRegistroAdapter();
