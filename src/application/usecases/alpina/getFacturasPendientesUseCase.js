import { alpinaService } from '../../services/alpinaServiceInstance.js';
import { AuthAlpinaAdapter } from '../../../infrastructure/adapters/AuthAlpinaAdapter.js';
import { AlpinaDatosAdapter } from '../../../infrastructure/adapters/AlpinaDatosAdapter.js';
import ValidationError from '../../../errors/Validation.error.js';
import { logger } from '../../../config/logger.js';

async function getFacturasPendientesUseCase(
  identificadorTendero,
  authAdapter = new AuthAlpinaAdapter(),
  datosAdapter = new AlpinaDatosAdapter()
) {
  if (!identificadorTendero) {
    throw new ValidationError("El identificador del tendero es requerido");
  }

  // 🔐 Obtener token de autenticación
  const token = await authAdapter.obtenerToken();

  // 📥 Obtener datos dinámicos desde BD
  const { nbCliente, nbAgenteComercial } = await datosAdapter.obtenerDatosClienteYAgente(identificadorTendero);

  // 🔍 Log antes de enviar a la API de Alpina
  logger.info('[UseCase] Datos a enviar a AlpinaAdapter', {
    nbCliente,
    nbAgenteComercial
  });

  // 📤 Llamar al servicio de facturas pendientes
  const facturas = await alpinaService.obtenerFacturasPendientes(token, nbCliente, nbAgenteComercial);

  return facturas;
}

export { getFacturasPendientesUseCase };



// import { alpinaService } from '../../services/alpinaServiceInstance.js';
// import { AuthAlpinaAdapter } from '../../../infrastructure/adapters/AuthAlpinaAdapter.js';
// import { AlpinaDatosAdapter } from '../../../infrastructure/adapters/AlpinaDatosAdapter.js';

// async function getFacturasPendientesUseCase(
//   identificadorTendero,
//   authAdapter = new AuthAlpinaAdapter(),
//   datosAdapter = new AlpinaDatosAdapter()
// ) {
//   if (!identificadorTendero) {
//     throw new Error('El identificador del tendero es requerido');
//   }

//   // Obtener token JWT de Alpina
//   const token = await authAdapter.obtenerToken();

//   // Obtener datos desde BD (cliente y agente comercial)
//   const { nbCliente, nbAgenteComercial } = await datosAdapter.obtenerDatosClienteYAgente(identificadorTendero);

//   // Consultar API de Alpina con token y datos dinámicos
//   const facturas = await alpinaService.obtenerFacturasPendientes(token, nbCliente, nbAgenteComercial);

//   return facturas;
// }

// export { getFacturasPendientesUseCase };


