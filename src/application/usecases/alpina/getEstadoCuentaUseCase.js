import { estadoCuentaAdapter } from '../../services/estadoCuentaServiceInstance.js';

export async function getEstadoCuentaUseCase(identificadorTendero) {
  if (!identificadorTendero) {
    throw new Error('El identificador del tendero es requerido');
  }

  return await estadoCuentaAdapter.obtenerEstadoCuenta(identificadorTendero);
}
