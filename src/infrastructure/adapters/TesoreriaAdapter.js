import { TesoreriaPort } from '../../domain/ports/TesoreriaPort.js';
import { tesoreriaRepository } from '../repositories/Tesoreria.repository.js';

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
    async existeRegistroPorFecha(fecha) {
        return await tesoreriaRepository.existeRegistroPorFecha(fecha);
    }
    async actualizarDispersion(id, nuevaDispersion) {
        return await tesoreriaRepository.actualizarDispersion(id, nuevaDispersion);
    }
    async procesarYGuardarRecaudo() {
        return await tesoreriaRepository.procesarYGuardarRecaudo();
    }
    async consultarDatosRecaudo() {
        return await tesoreriaRepository.consultarDatosRecaudo();
    }
    async actualizarStatusRecaudo(fecha) {
        return await tesoreriaRepository.actualizarStatusRecaudo(fecha);
    }
    async consultarRegistrosSinDispersion() {
        return await tesoreriaRepository.consultarRegistrosSinDispersion();
    }
}