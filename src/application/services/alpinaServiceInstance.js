import { AlpinaAdapter } from '../../infrastructure/adapters/alpinaAdapter.js';
import { AlpinaPort } from  '../../domain/ports/alpinaPort.js';

const alpinaService = new AlpinaPort(new AlpinaAdapter());

//module.exports = { alpinaService };

export { alpinaService }; 