import { AlpinaAdapter } from '../../infrastructure/adapters/alpinaAdapter.js';
import { AlpinaDatosAdapter } from '../../infrastructure/adapters/AlpinaDatosAdapter.js';
import { AlpinaPort } from '../../domain/ports/alpinaPort.js';
import { logger } from '../../config/logger.js';

// Instancias con logs
logger.info('[alpinaServiceInstance] Instanciando AlpinaAdapter...');
const alpinaAdapter = new AlpinaAdapter();

logger.info('[alpinaServiceInstance] Instanciando AlpinaDatosAdapter...');
const alpinaDatosAdapter = new AlpinaDatosAdapter();

logger.info('[alpinaServiceInstance] Instanciando AlpinaPort con ambos adaptadores...');
const alpinaService = new AlpinaPort(alpinaAdapter, alpinaDatosAdapter);

export { alpinaService };
