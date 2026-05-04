import { AuthAlpinaAdapter } from '../../../infrastructure/adapters/AuthAlpinaAdapter.js';
import axios from 'axios';

async function getClienteNombreUseCase(nbCliente, nbAgenteComercial) {
  const authAdapter = new AuthAlpinaAdapter();
  const token = await authAdapter.obtenerToken();

  const response = await axios.post(
    'https://qa-client-gateway-general.amovil.com.co:42281/clients/bancoW',
    { nbAgenteComercial: String(nbAgenteComercial), nbCliente: String(nbCliente) },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const cliente = response.data?.data?.[0];
  return {
    nombre: cliente?.nombre || null,
    apellido: cliente?.apellido || null,
  };
}

export { getClienteNombreUseCase };