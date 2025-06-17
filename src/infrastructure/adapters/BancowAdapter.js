import { bancowRepository } from "../repositories/bancow.repository.js";
import { BancowPort } from "../../domain/ports/BancowPort.js";

export class BancowAdapter extends BancowPort {

    async verificarDuplicadosPorIdFlujoRegistro(id) {
        return await bancowRepository.verificarDuplicados(id)
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