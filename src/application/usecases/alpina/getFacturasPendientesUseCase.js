import { alpinaService } from '../../services/alpinaServiceInstance.js';
import { AuthAlpinaAdapter } from '../../../infrastructure/adapters/AuthAlpinaAdapter.js';

async function getFacturasPendientesUseCase() {
  const authAdapter = new AuthAlpinaAdapter();
  const token = await authAdapter.obtenerToken();

  const facturas = await alpinaService.obtenerFacturasPendientes(token);
  return facturas;
}

export { getFacturasPendientesUseCase };
