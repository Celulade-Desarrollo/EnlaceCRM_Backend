import { bancowRepository } from "../repositories/bancow.repository";
import { BancowPort } from "../../domain/ports/BancowPort";

export class BancowAdapter extends BancowPort {

    async verificarDuplicadosPorIdFlujoRegistro(input) {
        return await bancowRepository.verificarDuplicados(input)
    }

    async obtenerTodos() {
        return await bancowRepository.obtenerTodos()
    }

    async obtenerPorIdFlujoRegistro(id) {
        return await bancowRepository.obtenerPorIdFlujoRegistro(id)
    }

    async crearRegistro(input) {
        return await bancowRepository.crearRegistro(input)
    }

    async crearUsuarioFinal(input) {
        return await bancowRepository.crearUsuarioFinal(input)
    }

    async eliminarPorIdFlujoRegistro(id) {
        return await bancowRepository.eliminarPorIdFlujo(id)
    }

    async obtenerUsuarioFinalPorIdFlujo(id) {
        return await bancowRepository.obtenerPorIdFlujoRegistro(id)
    }

    async actualizarEstadoBancow(id, estado) {
        return await bancowRepository.actualizarEstadoPorId()
    }

}