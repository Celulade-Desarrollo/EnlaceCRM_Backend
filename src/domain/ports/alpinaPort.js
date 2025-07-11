import { logger } from '../../config/logger.js';

class AlpinaPort {
  constructor(adapterFacturas) {
    this.adapterFacturas = adapterFacturas;
  }

  async obtenerFacturasPendientes(token, nbCliente, nbAgenteComercial) {
    logger.info('[AlpinaPort] Pasando datos al adapter de Alpina', {
      nbCliente,
      nbAgenteComercial
    });

    return await this.adapterFacturas.obtenerFacturasPendientes(token, nbCliente, nbAgenteComercial);
  }
}

export { AlpinaPort };


// class AlpinaPort {
//   constructor(adapter) {
//     this.adapter = adapter;
//   }

//   async obtenerFacturasPendientes(identificadorTendero, token) {
//     return await this.adapter.obtenerFacturasPendientes(identificadorTendero, token);
//   }
// }

// export { AlpinaPort };
