import { transaccionesRepository } from "../../infrastructure/repositories/transaccionesRepository.js";

export const transaccionesService = {
  async obtenerTodas() {
    return transaccionesRepository.obtenerTodasTransacciones();
  },

  async obtenerPorId(id) {
    return transaccionesRepository.obtenerPorIdMovimiento(id);
  },

  async crear(datosTransaccion) {
    return transaccionesRepository.crear(datosTransaccion);
  }
};
