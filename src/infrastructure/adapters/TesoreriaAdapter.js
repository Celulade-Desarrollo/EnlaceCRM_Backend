import { TesoreriaPort } from '../../domain/ports/TesoreriaPort.js';
import { tesoreriaRepository } from '../repositories/Tesoreria.repository';

export class TesoreriaAdapter extends TesoreriaPort {
    async crearRegistroEnTesoreria(data) {
        return await tesoreriaRepository.crearRegistroEnTesoreria(data);
    }
    async actualizarEstadoTesoreria(id, nuevoEstadoTesoreria) {
        return await tesoreriaRepository.actualizarEstadoTesoreria(id, nuevoEstadoTesoreria);
    }
    async actualizarEstadoBanco(id, nuevoEstadoBanco) {
        return await tesoreriaRepository.actualizarEstadoBanco(id, nuevoEstadoBanco);
    }
}