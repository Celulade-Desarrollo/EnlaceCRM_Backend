import { bancowRepository } from "../repositories/bancow.repository.js";
import { BancowPort } from "../../domain/ports/BancowPort.js";

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
        return await bancowRepository.eliminarPorIdFlujoRegistro(id)
    }

    async obtenerUsuarioFinalPorIdFlujo(id) {
        return await bancowRepository.obtenerPorIdFlujoRegistro(id)
    }

    async actualizarCoreBancario(idFlujoRegistro, input) {
        return await bancowRepository.actualizarCoreBancario(idFlujoRegistro, input);
    }

}