import { alpinaService } from '../../services/alpinaServiceInstance.js';
import { AuthAlpinaAdapter } from '../../../infrastructure/adapters/AuthAlpinaAdapter.js';

async function getFacturasPendientesUseCase(identificadorTendero, authAdapter = new AuthAlpinaAdapter()) {
  if (!identificadorTendero) {
    throw new Error('El identificador del tendero es requerido');
  }

  const token = await authAdapter.obtenerToken();
  const facturas = await alpinaService.obtenerFacturasPendientes(identificadorTendero, token);
  return facturas;
}

export { getFacturasPendientesUseCase };

