import { UserAccountPort } from "../../domain/ports/UserAccountPort.js";
import { userAccountRepository } from "../repositories/userAccount.repository.js";
import jwt from "jsonwebtoken";

export class UserAccountAdapter extends UserAccountPort {

    async obtenerTodos() {
        return await userAccountRepository.obtenerTodos()
    }

    async obtenerPorIdFlujoRegistro(id) {
        return await userAccountRepository.obtenerPorIdFlujoRegistro(id)
    }

    async verificarDuplicados(id) {
        return await userAccountRepository.verificarDuplicados(id)
    }

    async crearCuenta(input) {
        return await userAccountRepository.crearRegistro(input)
    }

    async eliminarPorIdFlujoRegistro(id) {
        return await userAccountRepository.eliminarPorIdFlujoRegistro(id)
    }

    async traerSaldo(idUsuario){
        return await userAccountRepository.traerSaldo(idUsuario)
    }
}
