//const { alpinaService } = require('../../services/alpinaServiceInstance');

import { alpinaService } from '../../services/alpinaServiceInstance.js';


async function getFacturasPendientesUseCase(identificadorTendero) {
  if (!identificadorTendero) {
    throw new Error('Se requiere un identificador de tendero');
  }

  const facturas = await alpinaService.obtenerFacturasPendientes(identificadorTendero);
  return facturas;
}

//module.exports = { getFacturasPendientesUseCase };

export { getFacturasPendientesUseCase }; 